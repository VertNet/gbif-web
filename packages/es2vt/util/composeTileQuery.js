/**
 * Given an elastic search query string query, then add a filter for a given tile. 
 * returns either the build query or the bodybuilder instance.
 */
const epsg3857Converter = require('../util/coordinateConverter');
const { wgs84 } = require('../util/projections');
const converters = {
  EPSG_3857: epsg3857Converter,
  EPSG_4326: wgs84
};

const padding = require('../util/padding');

function esTileQuery({x, y, z, precision, userQuery, srs, locationField}) {
  const converter = converters[srs] || converters.EPSG_3857;

  if (typeof (userQuery) === 'string') {
    userQuery = {
      query_string: {
        query: userQuery
      }
    }
  }

  // set defaults
  locationField = locationField || 'location';

  // get bounding box from tile coordinates
  const bb = converter.tile2boundingBox(x, y, z);
  //pad bounding box with overlapping geohash + an additional in all directions.
  const paddedBoundingBox = padding({ bb, precision });
  // compose an ES filter
  let tileQuery = {
    geo_bounding_box: {
    }
  };
  tileQuery.geo_bounding_box[locationField] = {
    top: paddedBoundingBox.north,
    left: paddedBoundingBox.west,
    bottom: paddedBoundingBox.south,
    right: paddedBoundingBox.east
  };

  // compose filter. simply nest the user query. Unclear if this is bad for performance. It could be flattened in most cases. But this is simple to do.
  let filter = [];
  if (userQuery && Object.keys(userQuery).length > 0) {
    filter.push(userQuery)
  }
  filter.push(tileQuery);

  return {
    bool: { filter: filter }
  };
}

module.exports = esTileQuery;