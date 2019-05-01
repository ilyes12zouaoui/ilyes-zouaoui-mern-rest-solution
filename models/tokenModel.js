const mongoose = require("mongoose");
const keys = require("../configs/keys_dev");
const crypto = require("crypto");
const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    default: keys.TOKEN_TYPES.ACOUNT_ACTIVATION
  }
});
tokenSchema.methods.generateToken = function() {
  this.token = crypto.randomBytes(20).toString("hex");
};

const tokenModel = mongoose.model("Token", tokenSchema);

module.exports = tokenModel;
