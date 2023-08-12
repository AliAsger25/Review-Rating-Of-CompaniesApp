const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "aliasger102002@gmail.com",
        pass: "kiplgmwjakimbghp",
    },
});

const mailOptions = {
    from: "aliasger102002@gmail.com",
    to: "cricheros123456@gmail.com",
    subject: "Hi",
    text: `Hello`,
};

module.exports = {
    transporter,
    mailOptions
};
