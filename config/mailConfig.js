var nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
    host: "mail.xxxxx.com",
    port: "25",
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'test@xxxxx.com',
        pass: 'xxxxx'
    }
});