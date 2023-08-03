module.exports = {


  friendlyName: ' Get Notify',


  description: '',


  inputs: {

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
    sails.log.debug('Running api/v1/notify/get ');
    try {
      const { status, data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: 'GET',
        server: 'LOGIC',
        endpoint: 'notify',
        params: inputs
      });
      this.res.set(headers);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: status,
        data: data,
      });
    }
    catch (err) {
      sails.log.error('error calling api/v1/api/v1/notify/get', err.message);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: err.response.status,
        data: err.response.data
      });
    }
    return exits[exitsName](responseData);
  }
};
