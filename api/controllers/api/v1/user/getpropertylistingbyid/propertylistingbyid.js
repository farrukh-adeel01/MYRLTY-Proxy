module.exports = {


    friendlyName: 'Get Listing Property',


    description: '',


    inputs: {

        id: {
            type: 'ref',
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
        sails.log.debug('Running api/v1/user/getpropertylistingby/getproperty-listingby.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'GET',
                server: 'LOGIC',
                endpoint: 'user/get-property/' + inputs.id,
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/propertylisting/property-listing.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }

        return exits[exitsName](responseData);
    }


};
