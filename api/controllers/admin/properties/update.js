module.exports = {


    friendlyName: 'Property is updated through admin-panel',


    description: '',
    inputs: {
        id: {
            type: "string",
            required: true,
        },
        user_id: {
            type: "string",
          //  required: true,
        },
        property_type_id: {
            type: "string",
          //  required: true,
        }, 
        property_address :{
          type :"string"
        },
    
        property_title :{
          type :"string"
        },
        property_description :{
          type :"string"
        },
        property_price :{
          type :"number"
        },
        property_area :{
          type :"string"
        },
        property_square_feet :{
          type :"string"
        },
        property_year_built:{
          type :"string",
          //columnType:"date"
        },
        latitude:{
          type :"number",
          columnType:"double"
        },
        longitude:{
          type :"number",
          columnType:"double"
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
        sails.log.debug('Running api/v1/user/property/is-sold.js with inputs ' + JSON.stringify(inputs));
        try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'PUT',
                server: 'LOGIC',
                endpoint: `admin/properties/${inputs.id}`,
                params: inputs

                
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log.error('error calling  api/v1/user/property/is-sold.js ', err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }
        return exits[exitsName](responseData);
    }
};
