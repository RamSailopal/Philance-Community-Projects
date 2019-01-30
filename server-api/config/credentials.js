const credentials={
    smtpConfig:{
        host: 'just59.justhost.com',
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: 'noreply@philance.org',
            pass: 'Philly@1234'
        }
    }
};
module.exports =credentials