const OccurrenceApi = require('./occurrence.source');

module.exports = {
  resolver: require('./occurrence.resolver'),
  typeDef: [require('./occurrence.type'), require('./occurrenceSearch.type')],
  dataSource: {
    occurrenceAPI: new OccurrenceApi()
  }
};