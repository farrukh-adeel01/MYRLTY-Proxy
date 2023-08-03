module.exports = {


    friendlyName: 'add seller',


    description: 'add seller for property',


    inputs: {
      user: {
        type: 'ref',
      //  required: true
      },

      property_id :{
        type:"string"
      },

      user_id :{
        type :"string"
      },

      seller_name :{
        type :"string"
      },

      address :{
        type :"string"
      },

      title_company_closer: {
        type: "string",
        
      },
  
      amount_of_contract: {
      type: "string",
      
      },
    
      is_earnest_money_received: {
      type: "string",
       
      },

      earnest_money_received_date: {
        type: "string",
          
      },

      home_inspection_date: {
        type: "string",
              
      },

      home_inspection_info: {
      type: "string",
            
      },

      termite_inspection_date: {
          type: "string",
            
      },

      termite_inspection_info: {
        type: "string",
          
      },

      is_survey_received: {
        type: "string",
        required: true 
      },

      is_new_survey: {
        type: "string",
        
      },
      
      survey_due_date: {
        type: "string",
        
      },

      new_survey_info: {
        type: "string",
        
      },

      appraisal_date: {
        type: "string",
        
      },
    
      appraisal_additional_info: {
        type: "string",
        
      },
      
      appraisal_due_date: {
        type: "string",
        
      },

      closing_date: {
        type: "string",
        
      },
    
      title_commitment_received_by: {
        type: "string",
        
      },

      is_cda_sent: {
        type: "string",
        
      },
    
      is_switch_over_utilities: {
        type: "string",
        
      },
      is_contract_to_lender: {
        type: "string",
        
      },
      is_home_warranty: {
        type: "string",
        
      },
      contract_to_lender_date: {
        type: "string",
        
      },
      option_period_end_date: {
        type: "string",
        
      },
      title_commit_to_be_rec_date: {
        type: "string",
      },
      additional_info_entire: {
        type: "string",
      },
      home_warranty_date: {
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
        sails.log("Calling logic/property/seller");
         try {
            const { status, data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: 'POST',
                server: 'LOGIC',
                endpoint: 'user/add-seller',
                params: inputs
            });
            this.res.set(headers);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: status,
                data: data,
            });
        }
        catch (err) {
            sails.log("Calling logic/property/seller" ,  err.message);
            [exitsName, responseData] = await sails.helpers.response.with({
                status: err.response.status,
                data: err.response.data
            });
        }

        return exits[exitsName](responseData);
    }


};
