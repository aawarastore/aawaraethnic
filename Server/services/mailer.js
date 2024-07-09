require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email service provider here, e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_KEY  // your email password or app-specific password
    }
});


const sendOtpEmail = (to, otp) => {
    const subject = 'OTP Verification';
    //   const text = `Your OTP code is ${otp}. It is valid for 5 minutes.`;
    const html = `<div>AawaraEthincs</div>
            <div>
              <p>Your OTP for verification <b>${otp}</b>.Do not share this OTP with anyone.</p>
              <p>Thank You!</p>
            </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to,                       // list of receivers
        subject: subject,             // Subject line
        html: html                    // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('OTP email sent: %s', info.messageId);
    });
};

module.exports = sendOtpEmail;
