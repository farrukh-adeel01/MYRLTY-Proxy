module.exports = {


    friendlyName: 'Post Registration',


    description: '',


    inputs: {
        agencyName: {
            type: "string",
            required: true
        },
        bio: {
            type: "string"
        },
        location: {
            type: "string"
        },
        latitude: {
            type: "number"
        },
        longitude: {
            type: "number"
        },
        availabilityFrom: {
            type: "string"
        },
        availabilityTo: {
            type: "string"
        },
        preferences: {
            type: "string"
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
        sails.log.debug('Running api/v1/user/postregistration/post-registration.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'POST',
                server: 'LOGIC',
                endpoint: 'user/post-registration',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/post/create.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
