let ret;

if (process.env.NODE_ENV === "development"){
  console.log("YOU ARE IN DEVELOPMENT MODE")
  ret = require("../keys/jwtSecret.js");
}
else {
  console.log("IN PRODUCTION MODE")
  ret = {
    secret: process.env.JWT_SECRET
  }
}

module.exports = ret
