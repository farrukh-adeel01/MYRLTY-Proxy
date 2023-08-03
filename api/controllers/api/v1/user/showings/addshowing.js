module.exports = {


    friendlyName: 'Add Showing',


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
        // property_id:{
        //     type:"number",
        //     required:true
        // }


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
        sails.log.debug('Running api/v1/user/showings/addshowings.js with inputs ');
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'POST',
                server: 'LOGIC',
                endpoint: 'user/add-showing',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/showings/addshowings.js with inputs ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
