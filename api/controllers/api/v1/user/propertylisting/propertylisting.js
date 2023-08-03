module.exports = {


    friendlyName: 'Property Listing',


    description: '',


    inputs: {
        propertyType: {
            type: "string",
            required: true
        },
        propertyAddress: {
            type: "string",
            required: true
        },
        propertyTitle: {
            type: "string",
            required: true
        },
        propertyDescription: {
            type: "string",
            required: true
        },
        propertyPrice: {
            type: "number",
            required: true
        },
        propertyArea: {
            type: "string",
            required: true
        },
        propertySquarefeet: {
            type: "string",
            required: true
        },
        propertyYear: {
            type: "string",
            required: true
        },
        latitude: {
            type: "number",
        },
        longitude: {
            type: "number",
        },
        property_images: {
            type: 'ref'
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
        sails.log.debug('Running api/v1/user/propertylisting/property-listing.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'POST',
                server: 'LOGIC',
                endpoint: 'user/add-property',
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
