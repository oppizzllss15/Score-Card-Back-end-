const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USERNAME,
    pass: process.env.PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const mailMessage = (mail: string, firstname: string, password: string) => {
  return {
    from: "from-example@email.com",
    to: `${mail}`,
    subject: "Subject",
    text: `Hello ${firstname}, the password for your Scorecard account is ${password}`,
  };
};

const messageTransporter = async (
  mail: string,
  firstname: string,
  password: string
) => {
  transporter.sendMail(
    mailMessage(mail, firstname, password),
    function (error: string, info: string) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

module.exports = { messageTransporter };
