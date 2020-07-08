const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.handler = function (event, context, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Zoho", // Change this values with whatever service you're using
    host: this.service,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", //enter mail sending account
      pass: "", //enter password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: "Mail Sender Daemon <mailsender@parthjawale.com>", // sender address
      to: "", // list of receivers separated by a comma
      subject: event.subject, // Subject line
      html: event.body, // html body
    },
    function (err, info) {
      if (err) {
        const error = {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          body: JSON.stringify({ message: "Error Sending email" }),
        };
        console.log("Error sending email");
        callback(null, error);
      } else {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work (to be on the safe side)
          },
          body: JSON.stringify({ message: "Successful" }),
        };
        console.log("Email sent successfully");
        callback(null, response);
      }
    }
  );
};
