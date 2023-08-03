
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
  friendlyName: 'Send email',

  description: '',

  inputs: {
    to: {
      type: 'string',
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
    name: {
      type: 'string'
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    sails.log('calling action helper/mail/send-email start');

    const smtpTransport = nodemailer.createTransport({
      // host: sails.config.MAIL.MAIL_HOST,
      // port: sails.config.MAIL.MAIL_PORT,
      // secure: sails.config.MAIL.MAIL_SECURE, // true for 465, false for other ports
      service: 'gmail',
      auth: {
        user: sails.config.MAIL.MAIL_AUTH_USER, // generated ethereal user
        pass: sails.config.MAIL.MAIL_AUTH_PASS, // generated ethereal password
      }
    });
    const htmlToSend = await convertHtml(inputs.name, inputs.to, inputs.msg);




    const mailOptions = {
      from: sails.config.MAIL.MAIL_INFO_FROM, // sender address
      to: inputs.to, // list of receivers
      subject: inputs.subject, // Subject line
      html: htmlToSend
    };
    // console.log(mailOptions);

    let info = await smtpTransport.sendMail(mailOptions);

    console.log('findme Message sent: %s', info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));





    sails.log('calling action helper/mail/send-email end');
    return exits.success();
  },
};

readHTMLFile = (path, callback) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      throw err;
    }
    else {
      // eslint-disable-next-line callback-return
      callback(null, html);
    }
  });
};



function convertHtml(_name, _to, _msg) {

  return new Promise(function (resolve, reject) {
    readHTMLFile('./assets/templates/emailtemplate.html', (_err, html) => {
      if (_err) {
        return reject(_err);
      }
      const template = handlebars.compile(html);
      const replacements = {
        msg: `<tr>
        <td>
          <table
            align="center"
            cellspacing="0"
            cellpadding="0"
            width="100%"
            height="70"
            bgcolor="#fff"
          >
            <tr>
              <td>
                <table style="padding: 0 20px">
                  <tr>
                    <td>
                      <h2 style="color: rgb(48, 48, 48)">Hi ${_name || (_to).split('@')[0]},</h2>
                    </td>
                  </tr>

                  <tr>
                    <td style="color: rgb(48, 48, 48)">
                      ${_msg}
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- para -->`
      };
      // const htmlToSend = template(replacements);
      return resolve(template(replacements));

    });
  })
}