const AWS = require("aws-sdk");

const awsConfig = require("../../config/aws-ses.js");

AWS.config.update(awsConfig);

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const sendEmail = async(config) => {

  let message = null;
  let from = null;
  let subject = null;

  // do email variables here...
  if (config.type === "password-reset"){
    subject = "Reset Your Password";
    from = "noreply@mail.epitrade.io";
    message =  `
        <h1>Please enter this token</h1>
        <h2>
          <a href='http://localhost:3000/account/reset?token=${config.misc.token}&id=${config.misc.id}'>Click here</a>
        </h2>
        <h4>Token will be: ${config.misc.token}</h4>
      `;
  }
  else if (config.type === "new-account"){
    subject = "Welcome to Superyagi Antennas!";
    from = "noreply@mail.epitrade.io";
    message =  `
        <div><img width="200px" src="https://s3.eu-central-1.wasabisys.com/allsilk/logo/all-silk.png"></div>
        <h1 style="margin-top: 32px;">Welcome Aboard</h1>
        <p>Thanks for registering on Superyagi Antennas!</p>
        <p>Cheers!</p>
      `;
  }
  else if (config.type === "admin-new-message"){
    subject = `${config.from} sent you a message`;
    from = "noreply@mail.epitrade.io";
    message =  `
        <div><img width="200px" src="https://s3.eu-central-1.wasabisys.com/allsilk/logo/all-silk.png"></div>
        <h1 style="margin-top: 32px;">New Message from ${ config.from }</h1>
        <p>${ config.message }</p>
      `;
  }
  else if (config.type === "admin-new-order"){
    subject = `You made a sale!`;
    from = "noreply@mail.epitrade.io";
    message =  `
        <div><img width="200px" src="https://s3.eu-central-1.wasabisys.com/allsilk/logo/all-silk.png"></div>
        <h1 style="margin-top: 32px;">New order from ${ config.from }</h1>
      `;
  }
  else if (config.type === "user-new-message"){
    subject = "Thanks for your message";
    from = "noreply@mail.epitrade.io";
    message =  `
        <div><img width="200px" src="https://s3.eu-central-1.wasabisys.com/allsilk/logo/all-silk.png"></div>
        <h1 style="margin-top: 32px;">Message Received</h1>
        <p>Thanks for sending us a message.</p>
        <p>We'll get back to you as quickly as we can!</p>
        <p>Cheers!</p>
      `;
  }
  else if (config.type === "user-order-shipped"){
    subject = "Your order has been shipped!";
    from = "noreply@mail.epitrade.io";
    message =  `
        <div><img width="200px" src="https://s3.eu-central-1.wasabisys.com/allsilk/logo/all-silk.png"></div>
        <h1 style="margin-top: 32px;">Your Order has been shipped!!!</h1>
        <p>Cheers!</p>
      `;
  }
  else if (config.type === "new-order"){
    subject = "Thanks for your order";
    from = "noreply@mail.epitrade.io";
    message =  `
        <h1>Thanks for your order :)</h1>
      `;
  }

  const params = {
      Destination: {
          ToAddresses: [ config.to ]
      },
      Message: {
          Body: {
              Html: {
                  Charset: 'UTF-8',
                  Data: message
              }
          },
          Subject: {
              Charset: 'UTF-8',
              Data: subject
          }
      },
      ReturnPath: from,
      Source: from
  };

  console.log("*******************************************************************")
  console.log("PARAMS ARE");
  console.log(params);
  console.log("*******************************************************************")


  ses.sendEmail(params, (err, data) => {
      if (err) {
          return console.log(err, err.stack);
      } else {
          console.log("Email sent.", data);
      }
  });


};



module.exports = { sendEmail };
