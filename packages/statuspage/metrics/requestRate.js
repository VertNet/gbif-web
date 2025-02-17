// avg request time for occurrence
// avg request time for species
// avg request time for other
// total number of requests per interval (sum)

const _ = require('lodash');
const { runMetrics } = require('./runMetrics');
const config = require('../config');
const metricID = config.METRIC_REQUEST_RATE;
const intervalInMinutes = 3;
const endpointPrefix = 'http://';

const esUrl = `${config.PRIVATE_KIBANA}/elasticsearch/${config.ELK_VARNISH_INDEX}/_search`;

const query = {
  "size": 0,
  "query": {
      "bool": {
          "filter": [
              {
                  "query_string": {
                      "default_field": "request",
                      "query": `\"${endpointPrefix}${config.API_V1}\" OR \"${endpointPrefix}${config.API_V2}\" OR \"${endpointPrefix}${config.BASEMAP_TILE_API}\"`
                  }
              },
              {
                  "range": {
                      "@timestamp": {
                          "gte": `now-${intervalInMinutes}m`,
                          "lt": "now"
                      }
                  }
              }
          ]
      }
  }
};

const getValue = body => {
  const value = _.get(body, 'hits.total');
  if (value) return Math.round(value / (60*intervalInMinutes));// get requests per minute
};

module.exports = runMetrics(esUrl, query, metricID, getValue);