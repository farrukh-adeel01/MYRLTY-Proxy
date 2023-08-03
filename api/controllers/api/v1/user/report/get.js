module.exports = {


    friendlyName: 'Property Listing',


    description: '',


    inputs: {

        month: {
            type: 'string',
            required: true
        },
        year: {
            type: 'string',
            required: true
        },
        keyword:{
            type:'string'
        },
        limit: {
            type: 'number',
            defaultsTo: 3
          },
        offset: {
            type: 'number',
            defaultsTo: 0
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
        sails.log.debug('Running api/v1/user/report/get.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'GET',
                server: 'LOGIC',
                endpoint: 'user/report/res',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/report/get.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
