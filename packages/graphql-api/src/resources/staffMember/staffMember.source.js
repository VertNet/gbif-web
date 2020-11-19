// const { ApolloError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../../config');
const API_V1 = config.apiv1;

class StaffMemberAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_V1;
  }

  async searchStaff({ query }) {
    return this.get('/grscicoll/person', query);
  }

  async getStaffByKey({ key }) {
    return this.get(`/grscicoll/person/${key}`);
  }

  /*
  getPersonsByKeys({ personKeys }) {
    return Promise.all(
      personKeys.map(key => this.getPersonByKey({ key })),
    );
  }
  */
}

module.exports = StaffMemberAPI;