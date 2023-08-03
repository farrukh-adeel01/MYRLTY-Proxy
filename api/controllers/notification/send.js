module.exports = {
  friendlyName: "add buyer",

  description: "add buyer for property",

  inputs: {
    id: {
      type: "string",
      description: "User ID",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    body: {
      type: "string",
      required: true,
    },

    silent: {
      type: "boolean",
      required: true,
    },
    extra_data: {
      type: "ref",
      required: true,
    },
    notification_type: {
      type: "string",
      required: true,
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
    },
    unauthorized: {
      responseType: "unauthorized",
    },
    forbidden: {
      responseType: "forbidden",
    },
    serverError: {
      responseType: "serverError",
    },
    notFound: {
      responseType: "notFound",
    },
  },

  fn: async function (inputs, exits) {
    sails.log("Calling logic/property/buyer");
    try {
      const { status, data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: "user/sendnotification",
        params: inputs,
      });
      this.res.set(headers);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: status,
        data: data,
      });
    } catch (err) {
      sails.log("Calling logic/property/buyer", err.message);
      [exitsName, responseData] = await sails.helpers.response.with({
        status: err.response.status,
        data: err.response.data,
      });
    }

    return exits[exitsName](responseData);
  },
};
