const nodemailer = require('nodemailer');

module.exports = {


  friendlyName: 'Test email',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run test-email`)');
    try {
      // const smtpTransport = nodemailer.createTransport({
      //   // host: sails.config.MAIL.MAIL_HOST,
      //   // port: sails.config.MAIL.MAIL_PORT,
      //   // secure: sails.config.MAIL.MAIL_SECURE, // true for 465, false for other ports
      //   service: 'gmail',
      //   auth: {
      //     user: sails.config.MAIL.MAIL_AUTH_USER, // generated ethereal user
      //     pass: sails.config.MAIL.MAIL_AUTH_PASS, // generated ethereal password
      //   }
      // });
      // const mailOptions = {
      //   from: sails.config.MAIL.MAIL_INFO_FROM, // sender address
      //   to: 'muneeb@yopmail.com', // list of receivers
      //   subject: 'test', // Subject line
      //   html: 'htmlToSend'
      // };
      // // console.log(mailOptions);
      // const isverified = await smtpTransport.verify();
      // console.log({ isverified })
      // let info = await smtpTransport.sendMail(mailOptions);
      // console.log({ info })
      await sails.helpers.mail.send.with({
        to: 'muneeb@yopmail.com',
        subject: 'OTP created',
        msg: 'Hello world'
      });
    } catch (e) {
      sails.log.error('Error', e);
    }

  }


};

