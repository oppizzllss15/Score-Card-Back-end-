"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const mailMessage = (mail, firstname, password) => {
    return {
        from: "from-example@email.com",
        to: `${mail}`,
        subject: "Subject",
        text: `Hello ${firstname}, the password for your Scorecard account is ${password}`,
    };
};
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_SECRET,
    },
});
const messageTransporter = async (mail, firstname, password) => {
    await transporter.sendMail(mailMessage(mail, firstname, password), function (err, info) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log(info);
        }
    });
};
module.exports = { messageTransporter };
