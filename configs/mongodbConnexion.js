const mongoose = require("mongoose");
const keys = require("./keys_dev");

const options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};

module.exports = mongoose =>
  mongoose
    .connect(keys.MONGODB_CONNEXTION, options)
    .then(() => {
      console.log("connected mongodb ...");
    })
    .catch(err => {
      console.log("not connected on mongodb");
    });
