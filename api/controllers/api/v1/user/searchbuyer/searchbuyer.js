module.exports = {


    friendlyName: 'Property Listing',


    description: '',
    inputs: {

        user: {
            type: 'ref'
        },
        limit: {
            type: 'number',
            defaultsTo: 3
          },
          offset: {
            type: 'number',
            defaultsTo: 0
          },
          keyword:{
            type:'string'
          },
          filter:{
            type:'string'
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
        sails.log.debug('Running api/v1/user/searchbuyer/searchbuyer.js with inputs ' + JSON.stringify(inputs));
        try {
            sails.log.debug(inputs)
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'GET',
                server: 'LOGIC',
                endpoint: 'user/search-buyer',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/searchbuyer/searchbuyer.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
