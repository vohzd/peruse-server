let ret;

if (process.env.NODE_ENV == "development"){
  ret = {
    secret: "SOME_RANDOM_STRING"
  }
}
else {
  ret = {
    secret: process.env.JWT_SECRET
  }
}

module.exports = ret;
