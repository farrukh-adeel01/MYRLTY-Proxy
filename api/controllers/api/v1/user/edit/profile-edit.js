module.exports = {


    friendlyName: 'Edit Profile',


    description: '',


    inputs: {
        agencyName: {
            type: "string",
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
        name: {
            type: "string"
        },

        phone_number: {
            type: "string"
        },
        profile_image: {
            type: "string"
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

        const { status, data, headers } = await sails.helpers.request.with({
            req: this.req,
            type: 'POST',
            server: 'LOGIC',
            endpoint: 'user/edit-profile',
            params: inputs
        });
        this.res.set(headers);
        [exitsName, responseData] = await sails.helpers.response.with({
            status: status,
            data: data,
        });

        const rData = {...responseData};

        //const result = {...inputs , ...responseData.data}
              
        if (exitsName == 'success' && responseData.status == true) {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'PUT',
                server: 'AUTH',
                endpoint: 'user/edit',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
           // rData.data.phone_number = responseData.data.phone 
            const result = { ...rData.data , phone: responseData.data.phone }
            const res = { status: true, message: "Successfull", data: result }

            return exits[exitsName](res);
            // delete responseData.data[0];
            // if (exitsName == 'success') {
            //     responseData.data = result;
            //     return exits[exitsName](responseData);
            // }
        }


        sails.log(exitsName, "exitname")


        return exits[exitsName](responseData);

    }
};
