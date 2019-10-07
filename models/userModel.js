const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { isEmail } = require("../helpers/CustomValidators");

const keys = require("../configs/keys_dev");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "incorrect format of email address"]
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: keys.USER_ROLES.SIMPLE
  },
  image: {
    type: String,
    default: "defaultProfilePicture.jpg"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  birthDate: {
    type: Date
  },

  phoneNumber: {
    type: Number
  },

  gender: {
    type: Boolean,
    required: true
  },

  isLoggedIn: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      id: this._id,
      role: this.role
    },
    keys.JWT_SECRET
  );
  return token;
};

userSchema.methods.encryptPassword = async function() {
  const salt = await bcrypt.genSalt(keys.SALT_VALUE);
  console.log(salt, this.password);
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
