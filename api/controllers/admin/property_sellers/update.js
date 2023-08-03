module.exports = {


    friendlyName: 'Property is updated through admin-panel',


    description: '',
    inputs: {
      id:{
        type:"number"
      },
      property_id :{
        type :"string",
        required:true

      },
      user_id :{
        type :"string",

      },
      seller_name :{
        type :"string",
        required:true

      },
      address :{
        type :"string",
        required:true

      },
      title_company_closer: {
        type: "string",
        required:true        
      },

      amount_of_contract: {
      type: "string",
      required:true
      },
  
      is_earnest_money_received: {
      type: "string",
      defaultTo:0
      },
      earnest_money_received_date: {
        type: "string",
        allowNull: true,
      },
      home_inspection_date: {
        type: "string",
        required:true
      },
      home_inspection_info: {
      type: "string",
      allowNull:true        
      },
      termite_inspection_date: {
          type: "string",
          required:true
 
      },

      termite_inspection_info: {
        type: "string",
        allowNull:true        
      },

      is_survey_received: {
        type: "string",
        defaultTo:0 
      },

      
      // survey_due_date: {
      //   type: "string",
      //   allowNull:true
      // },

      new_survey_info: {
        type: "string",
        defaultTo:'false'
        

      },

      appraisal_date: {
        type: "string",
        required:true
      },

      // appraisal_due_date: {
      //   type: "string",
      //   required:true        
      // },

      appraisal_additional_info: {
        type: "string",
        required:true
      },
  
  
      // is_cda_sent: {
      //   type: "string",
      //   defaultTo:0
      // },
      
      is_switch_over_utilities: {
        type: "string",
        defaultTo:0
      },

      is_contract_to_lender: {
        type: "string",
        defaultTo:0
      },

      is_home_warranty: {
        type: "string",
        defaultTo:0
      },

      contract_to_lender_date: {
        type: "string",
        allowNull:true
      },

      option_period_end_date: {
        type: "string",
        required:true  
      },

      title_commit_to_be_rec_date: {
        type: "string",
        required:true
      },

      additional_info_entire: {
        type: "string",
        required:true
      },

      home_warranty_date: {
        type: "string",
        allowNull:true
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
                endpoint: `admin/property_sellers/${inputs.id}`,
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
