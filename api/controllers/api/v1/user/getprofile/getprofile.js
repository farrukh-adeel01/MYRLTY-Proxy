module.exports = {


    friendlyName: 'Property Listing',


    description: '',
    inputs: {

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
        sails.log.debug('Running api/v1/user/categories/getcategories.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'GET',
                server: 'LOGIC',
                endpoint: 'user/get-user-profile',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });

            const rData = { ...responseData };


            if (responseData.status == true) {
                const { status, data, headers } = await sails.helpers.request.with({
                    req: this.req,
                    type: 'GET',
                    server: 'AUTH',
                    endpoint: 'user/get',
                    params: inputs
                });
                this.res.set(headers);
                [exitsName, responseData] = await sails.helpers.response.with({
                    status: status,
                    data: data,
                });
                const _____data = responseData.data;
                const { password, hasPassword, ...result } = { ...rData.data[0], phone: responseData.data.phone, email: responseData.data.email }
                const res = { status: true, message: "Successfull", data: result };
                sails.log.debug('sending profile');
                return exits[exitsName](res);

            } else {
                throw new Error('Invalid user');
            }
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/categories/getcategories.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
