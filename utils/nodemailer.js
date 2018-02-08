var transporter = require('../config/mailConfig');
console.log(transporter);
var mailOptions = {
    from: 'test@biznomy.com',
    to: 'pramod.tlabs@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});