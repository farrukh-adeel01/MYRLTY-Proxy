module.exports = {


    friendlyName: 'Get Listing Property',


    description: '',


    inputs: {
        user: {
            type: 'ref'
        },
        id: {
            type: "number",
           // required: true
        },
        property_id: {
            type: "string",
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
        sails.log("Calling property/mark-as-favourite/markasfavourite");
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'POST',
                server: 'LOGIC',
                endpoint: 'user/mark-favourite',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log("Calling property/mark-as-favourite/markasfavourite", err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }

        return exits[exitsName](responseData);
    }


};
