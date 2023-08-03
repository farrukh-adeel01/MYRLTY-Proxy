module.exports = {


    friendlyName: 'User Logout',


    description: '',


    inputs: {
      oldPassword: {
        type: 'string',
        
        required: true
      },
  
      password: {
          type: 'string',
         // isEmail: true,
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
        notFound: {
            responseType: 'notFound',
        }
    },

    fn: async function (inputs,exits) {
        sails.log.debug('Running auth/v1/reset.js');
        // const obj = {
        //   email : inputs.email,
        //   password : inputs.password
        // };
        try{
          const {status,data,headers} = await sails.helpers.request.with({
            req: this.req,
            type: 'POST',
            server: 'AUTH',
            endpoint: 'reset-password',
            params: inputs
          });
          this.res.set(headers);
          [exitsName, responseData] = await sails.helpers.response.with({
            status: status,
            data:data
          });
        }
        catch(err){
          sails.log.error('error calling auth/v1/reset.js',  err.message);
          [exitsName, responseData] = await sails.helpers.response.with({
            status: err.response.status,
            data: err.response.data
          });
        }
        return exits[exitsName](responseData);
      }
};
