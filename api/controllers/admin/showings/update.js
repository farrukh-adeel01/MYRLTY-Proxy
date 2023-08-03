module.exports = {


    friendlyName: 'Showings update',


    description: '',
    inputs: {
        // TODO update input values
        id: {
            type: "string",
            required: true,
        },
        name: {
            required: true,
            type: 'string'
        },
        address: {
            required: true,
            type: 'string'
        },
        description: {
            required: true,
            type: 'string'
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
        sails.log.debug('Running api/v1/admin/showings/update.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'PUT',
                server: 'LOGIC',
                endpoint: `admin/showings/${inputs.id}`,
                params: inputs


            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/admin/showings/update.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
