module.exports = {


  friendlyName: 'Request',


  description: 'Request something.',


  inputs: {
    req: {
      type: 'ref',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    server: {
      type: 'string',
      required: true
    },
    endpoint: {
      type: 'string',
      required: true
    },
    params: {
      type: 'ref',
      required: true
    }
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({req,type,server,endpoint,params}) {
    sails.log.debug('Running helpers/request.js');
    try{
      let url = '';
      switch(server){
        case 'LOGIC':
          url = sails.config.API_URL;
          break;
        case 'AUTH':
          url = sails.config.AUTH_URL;
          break;
      }
      sails.log.debug('call_to',url+endpoint);
      let options = {
        url: url+endpoint,
        headers: {},
        method: type,
        data: params,
        params: params
      };
      //console.log(req.headers);
      if ( req.headers['authorization'] ){
        const authHeader = req.headers['authorization'];
        options.headers.authorization = authHeader;
      }

      if ( req.headers['is_admin'] ){
        const isAdmin = req.headers['is_admin'];
        options.headers.isAdmin = isAdmin;
        sails.log.debug('API CALL BY ADMIN');
      }

      const axios = require('axios');

      return await axios(options).then((response)=>{
        if ( _.isUndefined(response.status) || _.isUndefined(response.data) || _.isUndefined(response.headers) ){
          return response;
        }
        return {status: response.status, data: response.data, headers: response.headers};
      }).catch((err)=>{
        sails.log.debug('error in helpers/request.js',err);
        return {status: err.response.status, data: err.response.data, headers: err.response.headers};
      });
    }
    catch(err){
      sails.log.debug('error in helpers/request.js '+err);
      return {status: err.response.status, data: err.response.data, headers: err.response.headers};
    }
  }


};
