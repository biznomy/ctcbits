var transporter = require('../config/mailConfig');


module.exports = {

    mailOptions : function(){
        return {
            from: 'test@biznomy.com',
            to: 'pramod.tlabs@gmail.com',
            subject: 'Kuch Bhi OTP',
            text: 'OTP : '
        }
    },

    mailSender : function(mailOptions){
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};