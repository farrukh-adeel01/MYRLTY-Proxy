module.exports = {


  friendlyName: 'get user',


  description: '',


  inputs: {
    sort: {
      type: 'string'
    },
    range: {
      type: 'string',
    },
    filter: {
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
    notFound:{
      responseType: 'notFound',

    }
  },

  fn: async function (inputs,exits) {
    sails.log.debug('Running auth/v1/admin/users/get.js with inputs '+JSON.stringify(inputs));
    try{
      const {status,data,headers} = await sails.helpers.request.with({
        req: this.req,
        type: 'GET',
        server: 'AUTH',
        endpoint: 'users',
        params: inputs
      });
      this.res.set(headers);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: status,
        data: data
      });
    }
    catch(err){
      sails.log.error('error calling auth/v1/admin/users/get.js',  err.message);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: err.response.status,
        data: err.response.data
      });
    }
    return exits[exitsName](responseData);
  }
};
