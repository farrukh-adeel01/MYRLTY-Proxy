module.exports = {


    friendlyName: 'Notification is Open',
  
  
    description: '',
  
  
    inputs: {
      notification_id:{
        type:"number",
        required:true
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
      sails.log.debug('Running api/v1/allow-notification/is-open ');
      try {
        const { status, data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: 'PUT',
          server: 'LOGIC',
          endpoint: 'is-open',
          params: inputs
        });
        this.res.set(headers);
        [exitsName, responseData] = await sails.helpers.response.with({
          status: status,
          data: data,
        });
      }
      catch (err) {
        sails.log.error('error calling api/v1/allow-notification/is-open', err.message);
        [exitsName, responseData] = await sails.helpers.response.with({
          status: err.response.status,
          data: err.response.data
        });
      }
      return exits[exitsName](responseData);
    }
  };
  