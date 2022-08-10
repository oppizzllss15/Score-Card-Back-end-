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

const mailMessage = (email: string, firstname: string, password: string, squad: number) => {
  return {
    from: "from-example@email.com",
    to: `${email}`,
    subject: "Scorecard",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "https://www.w3.org/TR/html4/strict.dtd">
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style type="text/css" nonce="">
          body,
          td,
          div,
          p,
          a,
          input {
            font-family: arial, sans-serif;
          }
        </style>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="shortcut icon"
          href="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
          type="image/x-icon"
        />
        <title>Gmail - Scorecard Student Email credentials</title>
        <style type="text/css" nonce="">
          body,
          td {
            font-size: 13px;
          }
          a:link,
          a:active {
            color: #1155cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          a:visited {
            color: ##6611cc;
          }
          img {
            border: 0px;
          }
          pre {
            white-space: pre;
            white-space: -moz-pre-wrap;
            white-space: -o-pre-wrap;
            white-space: pre-wrap;
            word-wrap: break-word;
            max-width: 800px;
            overflow: auto;
          }
          .logo {
            left: -7px;
            position: relative;
          }
        </style>
      </head>
      <body>
        <div class="bodycontainer">
          <hr />
          <table width="100%" cellpadding="12" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td>
                  <div style="overflow: hidden">
                    <font size="-1">
                      <div
                        lang="en-NG"
                        link="#0563C1"
                        vlink="#954F72"
                        style="word-wrap: break-word"
                      >
                        <div class="m_766918947931841387WordSection1">
                          <p class="MsoNormal">
                            Welcome&nbsp;to&nbsp;Scorecard,&nbsp;${firstname}
                          </p>
                          <p class="MsoNormal">&nbsp;</p>
                          <p class="MsoNormal">
                            You are in the
                            <span lang="EN-US">SQ0${squad} Squad</span>.
                          </p>
                          <p class="MsoNormal">&nbsp;</p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >Throughout the program, you are recognized as a
                              student by our education partners and have
                              access&nbsp;to&nbsp;benefits offered by them.</span
                            >
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >We will share more details in the future on
                              Teams.</span
                            >
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US">&nbsp;</span>
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US">Your email credential is below</span>
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >Email:&nbsp;<b
                                ><a
                                  href="mailto:${email}"
                                  target="_blank"
                                  >${email}<wbr /></a
                                ></b
                              ></span
                            >
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >Password (Case sensitive):&nbsp;<b
                                >${password}</b
                              ></span
                            >
                          </p>
                          <p class="MsoNormal">&nbsp;</p>
    
                          <p class="MsoNormal">
                            <span lang="EN-US">&nbsp;</span>
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >The recommended browser is&nbsp;<a
                                href="https://microsoft.com/edge"
                                title="https://microsoft.com/edge"
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://microsoft.com/edge&amp;source=gmail&amp;ust=1659952419665000&amp;usg=AOvVaw1fPeEK-LXaJXzgINljEdwI"
                                >Microsoft Edge Chromium</a
                              >, setup a School profile.</span
                            >
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >Download the&nbsp;<a
                                href="https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/download-app"
                                title="https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/download-app"
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/download-app&amp;source=gmail&amp;ust=1659952419665000&amp;usg=AOvVaw24G0LhT55qAMwsggDNLxSv"
                                >Microsoft Teams app</a
                              >&nbsp;for your operating system.</span
                            >
                          </p>
                          <p class="MsoNormal">
                            <span lang="EN-US"
                              >Add your school email&nbsp;to&nbsp;your
                              existing&nbsp;<a
                                href="https://github.com/settings/emails"
                                title="https://github.com/settings/emails"
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://github.com/settings/emails&amp;source=gmail&amp;ust=1659952419665000&amp;usg=AOvVaw0KUSjpLUXZfkmwsbnDJE3k"
                                >GitHub</a
                              >&nbsp;account.</span
                            >
                          </p>
                          <p class="MsoNormal">
                            <b><span lang="EN-US">&nbsp;</span></b>
                          </p>
                          <p class="MsoNormal">
                            Once you’ve joined teams, use the Team Code:&nbsp;<b
                              >uyffp19</b
                            ><b> </b>to&nbsp;join the SQ0${squad} </span
                            >team.
                          </p>
                          <p class="MsoNormal">&nbsp;</p>
                          <p class="MsoNormal">
                            See this&nbsp;<a
                              href="https://support.microsoft.com/en-us/office/use-a-link-or-code-to-join-a-team-c957af50-df15-46e3-b5c4-067547b64548"
                              title="https://support.microsoft.com/en-us/office/use-a-link-or-code-to-join-a-team-c957af50-df15-46e3-b5c4-067547b64548"
                              target="_blank"
                              data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://support.microsoft.com/en-us/office/use-a-link-or-code-to-join-a-team-c957af50-df15-46e3-b5c4-067547b64548&amp;source=gmail&amp;ust=1659952419665000&amp;usg=AOvVaw1rKTgAcfe-N4mBtku4_KRt"
                              >support article</a
                            >&nbsp;on how&nbsp;to&nbsp;join Teams using a Team Code.
                          </p>
                          <p class="MsoNormal">&nbsp;</p>
                          <p class="MsoNormal">See you on Teams.</p>
                          <p class="MsoNormal">&nbsp;</p>
                          <p class="MsoNormal">&nbsp;</p>
                        </div>
                      </div>
                    </font>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
    ` 
  };
};

const messageTransporter = async (
  email: string,
  firstname: string,
  password: string,
  squad: number
) => {
  transporter.sendMail(
    mailMessage(email, firstname, password, squad),
    function (error: string, info: string) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

module.exports = { messageTransporter };
