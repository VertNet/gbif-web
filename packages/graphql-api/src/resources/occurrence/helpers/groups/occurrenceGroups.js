/**
 * This helper groups all relevant terms into groups and adds
 * verbatim value
 * interpreted value (or varbatim again if it isn't interpreted)
 * detected issues related to this field
 * a comment on how this field has been changed (altered/infered/excluded)
 * 
 * The end result is something along:
 * {
 *  groupName: {
 *    simpleName: {
 *      qualifiedName, value, verbatimValue, issues, comment
 *    }
 *  }
 * }
 */
const _ = require('lodash');
const terms = require('./terms.json');

const defaultValue = {
  'occurrence': [],
  'record': [],
  'organism': [],
  'materialSample': [],
  'event': [],
  'location': [],
  'geologicalContext': [],
  'identification': [],
  'taxon': [],
  'other': []
}

var groupBy = function (arr, key, field) {
  return arr.reduce(function (groups, obj) {
    let value = field ? obj[field] : obj;
    (groups[value[key]] = groups[value[key]] || []).push(value);
    return groups;
  }, {});
};

var keyBy = function (arr, key, fn) {
  return arr.reduce(function (map, obj) {
    let value = obj;
    if (fn) {
      if (typeof fn === 'string') {
        value = obj[fn];
      } else if (typeof fn === 'function') {
        value = fn(obj, key, arr);
      }
    }
    map[value[key]] = value;
    return map;
  }, {});
};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

const qualified2Simple = groupBy(terms, 'qualifiedName', 'simpleName')

const remarkTypes = require('../../../../enums/interpretationRemark').map(remark => {
  return {
    ...remark,
    simpleRelatedTerms: remark.relatedTerms.map(qualifiedName => qualified2Simple[qualifiedName])
  }
});

// terms that aren't dwc or dc, but should be shown anyway
const termsWhiteList = [
  'elevation',
  'elevationAccuracy',
  'depth',
  'depthAccuracy',
  'distanceAboveSurface',
  'distanceAboveSurfaceAccuracy',
  'recordedByID',
  'identifiedByID'
];

function getTermSubset(terms) {
  // field terms that are to be included independent of their source. that is included these gbif specific terms
  return terms.filter(term => term.source === 'DwcTerm' || term.source === 'DcTerm' || typeof termsWhiteList.indexOf(term.simpleName) > -1);
}

const visibleTerms = getTermSubset(terms);

const remarkMap = remarkTypes.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {})

/*
Generate functions that takes an occurrences and a group and returns an object with the terms
{
  Taxon: occurrences => [{value, verbatim, remarks}]
}
*/
module.exports = function ({ occurrence, verbatim }) {
  // create a map with issues per field
  const field2issues = occurrence.issues.reduce((field2issues, issue) => {
    if (remarkMap[issue]) {
      remarkMap[issue].simpleRelatedTerms.forEach(term => {
        field2issues[term] = field2issues[term] || [];
        field2issues[term].push(_.pick(remarkMap[issue], ['id', 'severity']));
      })
    }
    return field2issues;
  }, {})

  const enrichedTerms = visibleTerms
    .filter(({ qualifiedName, simpleName }) => {
      // remove terms that have no value (neither verbatim or interpreted)
      return typeof occurrence[simpleName] !== 'undefined' || typeof verbatim[qualifiedName] !== 'undefined';
    })
    .map(({ qualifiedName, simpleName, group = 'other', source, compareWithVerbatim }) => {
      // enrich the used terms with related issues, remarks and both verbatim and GBIF view of the value
      const camelGroup = camelize(group);
      return {
        qualifiedName, simpleName, group: camelGroup, source,
        label: simpleName,
        issues: field2issues[simpleName],
        remarks: getRemarks({ value: occurrence[simpleName], verbatim: verbatim[qualifiedName], compareWithVerbatim }),
        value: occurrence[simpleName],
        verbatim: verbatim[qualifiedName]
      }
    }, {});
  const groups = Object.assign({}, defaultValue, groupBy(enrichedTerms, 'group'));
  Object.keys(groups).forEach(groupName => {
    groups[groupName] = keyBy(groups[groupName], 'simpleName');
  });
  return groups;
}

function getRemarks({ value, verbatim, compareWithVerbatim }) {
  /*
      EXCLUDED has bben replaced with NOT_INDEXED
  */
  if (compareWithVerbatim === false) {
    return null
  } else if (_.isNil(value)) {
    return 'NOT_INDEXED';
  } else if (_.isNil(verbatim)) {
    return 'INFERRED';
  } else if (value.toString().toLowerCase().replace(/_/g, '') !== verbatim.toString().toLowerCase().replace(/_/g, '')) {
    return 'ALTERED';
  } else {
    return null
  }
}