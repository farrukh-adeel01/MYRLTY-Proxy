module.exports = {


  friendlyName: 'delete user',


  description: '',


  inputs: {
    id: {
      type: 'string',
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
    sails.log.debug('Running auth/v1/admin/users/delete.js with inputs '+JSON.stringify(inputs));
    try{
      const {status,data,headers} = await sails.helpers.request.with({
        req: this.req,
        type: 'DELETE',
        server: 'AUTH',
        endpoint: 'users/'+inputs.id,
        params: inputs
      });
      this.res.set(headers);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: status,
        data: data
      });
    }
    catch(err){
      sails.log.error('error calling auth/v1/admin/users/delete.js',  err.message);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: err.response.status,
        data: err.response.data
      });
    }
    return exits[exitsName](responseData);
  }
};

