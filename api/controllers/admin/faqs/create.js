module.exports = {


  friendlyName: 'Property note created',


  description: '',
  inputs: {
    //   property_id :{
    //       type :"string"
    //     },
        question: {
          type: "string",
          required: true,
      },
      answer: {
        type: "string",
        required: true,
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
      sails.log.debug('Running api/v1/admin/notes/notes.js with inputs ' + JSON.stringify(inputs));
      try {
          const { status, data, headers } = await sails.helpers.request.with({
              req: this.req,
              type: 'POST',
              server: 'LOGIC',
              endpoint: 'admin/faqs',
              params: inputs

              
          });
          this.res.set(headers);
          [exitsName, responseData] = await sails.helpers.response.with({
              status: status,
              data: data,
          });
      }
      catch (err) {
          sails.log.error('error calling  api/v1/admin/notes/notes.js ', err.message);
          [exitsName, responseData] = await sails.helpers.response.with({
              status: err.response.status,
              data: err.response.data
          });
      }
      return exits[exitsName](responseData);
  }
};
