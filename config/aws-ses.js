let ret;

if (process.env.NODE_ENV == "development"){
  ret = require("../keys/aws-ses.js");
}
else {
  ret = {
   accessKeyId:  process.env.SES_KEY,
   secretAccessKey:  process.env.SES_SECRET,
   region: process.env.SES_REGION
  }
}

module.exports = ret;
