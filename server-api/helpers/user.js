var nodemailer=require('nodemailer');
var credentials=require('../config/credentials')
var users={
    emailUsers:(payload)=>{
        var config=payload.config;
        console.log('emailing users')
        var data=payload.data;
        var transporter = nodemailer.createTransport(credentials.smtpConfig);
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: credentials.gmail[0].email,
        //       pass: credentials.gmail[0].password
        //     }
        //   });
          
          var mailOptions = {
            from: config.from,
            to: config.to,
            subject: data.subject,
            text: data.text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}
module.exports=users