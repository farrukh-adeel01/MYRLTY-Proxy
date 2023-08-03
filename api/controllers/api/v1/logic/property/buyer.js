module.exports = {


    friendlyName: 'add buyer',


    description: 'add buyer for property',


    inputs: {
        user: {
            type: 'ref',
            //required: true
          },
        property_id: {
            type: "string",
            required: true
        },
        user_id: {
            type: "string",
          //  required: true
        },
        buyer_name :{
            type :"string"
          },
        address: {
            type: "string",
          //  required: true
        },
        title_company_closer: {
            type: "string",
          //  required: true
        },
        amount_of_contract: {
            type: "string",
          //  required: true
        },
        is_earnest_money_received: {
          type: "string",
        //  required: true 
         },

         earnest_money_received_date: {
            type: "string",
             
          },
         home_inspection_date: {
            type: "string",
          //  required: true     
        },
        home_inspection_info: {
          type: "string",
        //  required: true     
        },
        termite_inspection_date: {
            type: "string",
          //  required: true 
        },
        termite_inspection_info: {
          type: "string",
        //  required: true 
        },
        is_survey_received: {
            type: "string",
          //  required: true 
          },
          is_new_survey: {
            type: "string",
             
          },
          new_survey_info: {
            type: "string",
             
          },
          appraisal_date: {
            type: "string",
             
          },
          appraisal_due_date: {
            type: "string",
             
          },
          appraisal_additional_info: {
            type: "string",
             
          },
          closing_date: {
            type: "string",
             
          },
          closing_additional_info: {
            type: "string",
             
          },
          title_commitment: {
            type: "string",
             
          },
          is_cda_sent: {
            type: "string",
             
          },
          is_home_warranty: {
            type: "string",
             
          },
          home_warranty_date: {
            type: "string",
             
          },
          is_switch_over_utilities: {
            type: "string",
             
          },
          contract_to_lender_date: {
            type: "string",
            
          },
          is_contract_to_lender: {
            type: "string",
            
          },
          option_period_end: {
            type: "string",
            
          },
          termite_inspection_info: {
            type: "string",
            
          },
          additional_info_entire: {
            type: "string",
            
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


    fn: async function (inputs , exits) {
        sails.log("Calling logic/property/buyer");
         try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'POST',
                server: 'LOGIC',
                endpoint: 'user/add-buyer',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log("Calling logic/property/buyer" ,  err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }

        return exits[exitsName](responseData);
    }


};
