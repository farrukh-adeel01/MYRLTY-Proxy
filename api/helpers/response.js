module.exports = {


  friendlyName: 'Response',


  description: 'Response something.',


  inputs: {
    status: {
      type: 'number'
    },
    data: {
      type: 'ref'
    }
  },


  exits: {


  },


  fn: async function ({status, data}) {
    sails.log.debug('calling helper/response',{status, data: data.data});

    switch(status){
      case 200:
        return ['success', {
          status: data.status,
          message: data.message,
          data: data.data
        }];
      case 400:
        return ['invalid',{
          status: data.status,
          message: data.message,
          data: data.data
        }];
      case 401:
        return ['unauthorized',{
          status: data.status,
          message: data.message,
          data: data.data
        }];
      case 403:
        return ['forbidden',{
          status: data.status,
          message: data.message,
          data: data.data
        }];
      case 404:
        return ['notFound',{
          status: data.status,
          message: data.message,
          data: data.data
        }];
      default:
        return['serverError',{
          status: false,
          message: data.message,
          data: data.data
        }];
    }
  }


};

