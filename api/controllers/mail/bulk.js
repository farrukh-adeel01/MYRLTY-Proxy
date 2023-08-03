module.exports = {


    friendlyName: 'Send',
  
  
    description: 'Send mail.',
  
  
    inputs: {
      to: {
        type: 'ref',
        required: true,
      },
      subject: {
        type: 'string',
        required: true,
      },
      msg: {
        type: 'string',
        required: true,
      },
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      sails.log('calling mail/bulk');
      try{
        await sails.helpers.mail.bulk.with({
        //   to: inputs.to,
          to: `${inputs.to.toString()}`,
          subject: inputs.subject,
          msg: inputs.msg
        });
  
        return exits.success({status: true, data: [], message: 'Email sent.'});
      }catch(e) {
        sails.log.error('error sending email', e);
        return exits.success({status: false, data: [], message: 'Error sending email'});
      }
  
    }
  
  
  };
  