module.exports = {


  friendlyName: 'Logout',


  description: '',


  inputs: {

    token: {
      type: 'string',
    },
    device_token: {
      type: 'string'
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
    unauthorized: {
      responseType: 'unauthorized'
    },
    forbidden: {
      responseType: 'forbidden',
    },
    serverError: {
      responseType: 'serverError',
    },
    notFound: {
      responseType: 'notFound',

    }
  },

  fn: async function (inputs, exits) {
    sails.log.debug('Running auth/v1/logout.js with inputs ' + JSON.stringify(inputs));
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: 'POST',
        server: 'AUTH',
        endpoint: 'logout',
        params: inputs
      });
      await sails.helpers.request.with({
        req: this.req,
        type: 'POST',
        server: 'LOGIC',
        endpoint: 'logout',
        params: inputs
      });
      this.res.set(headers);
      return exits.success(data);
    }
    catch (err) {
      sails.log.error('error calling auth/v1/logout', err.message);
      if (!_.isUndefined(err.response) && !_.isUndefined(err.response.data) && !_.isUndefined(err.response.status)) {
        let [exitsName, responseData] = await sails.helpers.response.with({
          status: err.response.status,
          data: err.response.data
        });
        return exits[exitsName](responseData);

      }
      return exits.serverError({ status: false, data: [], message: 'Unknown server error.' });
    }
  }
};
