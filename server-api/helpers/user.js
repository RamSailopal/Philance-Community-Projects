var nodemailer = require('nodemailer');
var credentials = require('../config/credentials')
var users = {
  emailUsers: (payload) => {
    var config = payload.config;
    var data = payload.data;
    var transporter = nodemailer.createTransport(credentials.smtpConfig);

    var mailOptions = {
      from: config.from,
      to: config.to,
      subject: data.subject,
      text: data.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  },
  emailUsersAsync: (payload) => {
    return new Promise((resolve, reject) => {
      var config = payload.config;
      var data = payload.data;
      var transporter = nodemailer.createTransport(credentials.smtpConfig);

      var mailOptions = {
        from: config.from,
        to: config.to,
        subject: data.subject,
        text: data.text
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject()
        } else {
          resolve(info)
        }
      });
    })

  },
}
module.exports = users