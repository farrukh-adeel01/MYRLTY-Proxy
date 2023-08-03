module.exports = {


    friendlyName: 'Update Showing',


    description: '',


    inputs: {
        name: {
            type: "string",
            required: true
        },
        address: {
            type: "string",
            required: true
        },
        date: {
            type: "string",
            required: true
        },
        start_time: {
            type: "string",
            required: true
        },
        end_time: {
            type: "string",
            required: true
        },
        description: {
            type: "string",
            required: true
        },
        showing_id: {
            type: "number",
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

    fn: async function (inputs, exits) {
        sails.log.debug('Running api/v1/user/showings/updateshowings.js with inputs ');
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'PUT',
                server: 'LOGIC',
                endpoint: 'user/update-showing',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/showings/updateshowings.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
