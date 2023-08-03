module.exports = {


  friendlyName: ' device token',


  description: '',


  inputs: {
    user: {
      type: 'ref',
      //required: true
    },
    device_token: {
      type: "string",
      required: true,
    },
    device_platform: {
      type: "string",
      // required: true,
    },
    unique_id: {
      type: "string",
      // required: true,
    },
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
    sails.log.debug('Running api/v1/device-token/save ');
    try {
      const { status, data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: 'POST',
        server: 'LOGIC',
        endpoint: 'device-token',
        params: inputs
      });
      this.res.set(headers);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: status,
        data: data,
      });
    }
    catch (err) {
      sails.log.error('error calling api/v1/device-token/save', err.message);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: err.response.status,
        data: err.response.data
      });
    }
    return exits[exitsName](responseData);
  }
};
