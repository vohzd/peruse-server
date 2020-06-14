const mongoose     = require("mongoose");

const dbConnection = () => {
  let ret;
  if (process.env.NODE_ENV == "development"){
    ret = require("../keys/mongo.js");
  }
  else {
    ret = process.env.MONGO_DB;
  }
  return ret;
}

mongoose.connect(dbConnection(), { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", error => console.log(error));
