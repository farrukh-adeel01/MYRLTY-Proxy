module.exports = {


  friendlyName: 'Property is sold',


  description: '',
  inputs: {
    user_id: {
      type: "string"
    },
    property_id: {
      type: "string"
    },
    buyer_name: {
      type: "string",
      required: true
    },
    address: {
      type: "string",
      required: true
    },
    title_company_closer: {
      type: "string",
      required: true

    },
    option_period_end: {
      type: "string",
      required: true,

    },
    amount_of_contract: {
      type: "string",
      required: true

    },

    contract_to_lender_date: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    is_contract_to_lender: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    is_earnest_money_received: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    earnest_money_received_date: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    home_inspection_date: {
      type: "string",
      required: true

    },
    home_inspection_info: {
      type: "string",
      allowNull: true

    },
    termite_inspection_date: {
      type: "string",
      required: true

    },

    is_survey_received: {
      type: "string",
      allowNull: true
    },
    is_new_survey: {
      type: "string",
      DefaultTo:false,
      // required: true

    },
    new_survey_info: {
      type: "string",
      // required: true

    },
    appraisal_date: {
      type: "string",
      required: true

    },
    appraisal_due_date: {
      type: "string",
      required: true

    },
    appraisal_additional_info: {
      type: "string",
      required: true

    },
    closing_date: {
      type: "string",
      required: true

    },
    // closing_additional_info: {
    //   type: "string",
    //   required: true

    // },

    title_commitment: {
      type: "string",
      required: true

    },
    is_home_warranty: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    home_warranty_date: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    is_switch_over_utilities: {
      type: "string",
      DefaultTo:0,
      // required: true

    },
    termite_inspection_info: {
      type: "string",
      allowNull: true

    },
    additional_info_entire: {
      type: "string",
      required: true


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
        type: 'POST',
        server: 'LOGIC',
        endpoint: 'admin/property_buyers',
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
