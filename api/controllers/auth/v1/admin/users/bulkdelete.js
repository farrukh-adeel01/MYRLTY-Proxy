module.exports = {


  friendlyName: 'bulk-delete user',


  description: '',


  inputs: {
    filter: {
      type: 'json',
      required: true
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
    sails.log.debug('Running auth/v1/admin/users/bulkdelete.js with inputs '+JSON.stringify(inputs));
    try{
      const {status,data,headers} = await sails.helpers.request.with({
        req: this.req,
        type: 'DELETE',
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
      sails.log.error('error calling auth/v1/admin/users/bulkdelete.js',  err.message);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: err.response.status,
        data: err.response.data
      });
    }
    return exits[exitsName](responseData);
  }
};
