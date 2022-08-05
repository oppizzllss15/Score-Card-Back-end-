const nodemailer = require("nodemailer");
import { HttpError } from "http-errors";

const mailMessage = (mail: string, firstname: string, password: string) => {
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

const messageTransporter = async (mail: string, firstname: string, password: string) => {
  await transporter.sendMail(mailMessage(mail, firstname, password), function (err: HttpError, info: object) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info);
    }
  });
};

module.exports = { messageTransporter };
