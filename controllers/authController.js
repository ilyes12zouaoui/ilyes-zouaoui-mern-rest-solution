const userModel = require("../models/userModel");
const tokenModel = require("../models/tokenModel");
const keys = require("../configs/keys_dev");
const sendEmail = require("../helpers/email/SendEmail");
const _ = require("lodash");
//
// signInController,
// signUpController,
// accountActivationController,
// resendAccountActivationEmailController,
// signOutController,
// resetPassword,
// forgotPassword,

// --------------------forgotPassword
const forgotPassword = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email }).exec();

  if (!user) {
    return res.status(400).send({
      errors: { global: "no user was found with this email address" }
    });
  }

  let token = new tokenModel({
    userId: user._id,
    type: keys.TOKEN_TYPES.RESET_PASSWORD
  });
  token.generateToken();

  token = await token.save();

  sendEmail(user, token.token, keys.EMAIL.EMAIL_REASON.RESET_PASSWORD);

  res.send({
    success: {
      global: `a reset password e-mail was sent to ${
        user.email
      } pls check it out`
    }
  });
};
// --------------------resetPasswordController
const resetPasswordController = async (req, res) => {
  const token = await tokenModel
    .findOne({
      token: req.params.token
    })
    .exec();
  if (!token) {
    return res.status(400).send({ errors: { global: "wrong activation id" } });
  }

  let user = await userModel.findById(token.userId).exec();

  user.password = req.body.password;
  await user.encryptPassword();
  await user.save();
  await token.remove();
  return res.send({
    success: { global: "your password was reseted succesfully" }
  });
};

//---------------signInController
const signInController = async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email }).exec();

  if (user === null) {
    return res
      .status(400)
      .send({ errors: { global: "wrong username or password" } });
  }

  const compareResult = await user.comparePassword(req.body.password);

  if (compareResult !== true) {
    return res
      .status(400)
      .send({ errors: { global: "wrong username or password" } });
  }

  if (!user.isActive) {
    return res.status(400).send({
      errors: {
        global:
          "your account is inactive, pls check your e-mail to actviate it",
        userId: user._id
      }
    });
  } else if (user.isBanned) {
    return res.status(400).send({
      errors: {
        global:
          "your account is banned contact our administration to release it"
      }
    });
  }

  user.isLoggedIn = true;
  user = await user.save();

  const token = user.generateAuthToken();

  user = user.toObject();
  user.id = user._id;
  user = _.omit(user, ["__v", "_id"]);

  return res.status(200).send({
    token,
    user
  });
};

//-------------------signOutController
const signOutController = async (req, res) => {
  req.user.isLoggedIn = false;

  await req.user.save();
  return res.send({
    success: {
      global: "sign out"
    }
  });
};

//-------------------signUpController
const signUpController = async (req, res) => {
  const oldUser = await userModel.findOne({ email: req.body.email }).exec();

  if (oldUser != null) {
    return res
      .status(400)
      .send({ errors: { email: "email already existant" } });
  }
  let user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    sexe: req.body.sexe,
    password: req.body.password,
    role: keys.USER_ROLES.SIMPLE,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    ...(req.body.phoneNumber && { phoneNumber: req.body.phoneNumber })
  });

  await user.encryptPassword();
  user = await user.save();

  let userToken = new tokenModel({
    userId: user._id,
    type: keys.TOKEN_TYPES.ACCOUNT_ACTIVATION
  });
  userToken.generateToken();

  userToken = await userToken.save();

  sendEmail(user, userToken.token, keys.EMAIL.EMAIL_REASON.ACCOUNT_ACTIVATION);

  res.send({
    success: {
      global: `a verification e-mail was sent to ${user.email} pls check it out`
    }
  });
};

//------------------ resendAccountActivationEmailController
const resendAccountActivationEmailController = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id }).exec();
  if (user === null) {
    return res.status(400).send({ errors: { global: "wrong credentiels" } });
  }

  if (user.isActive) {
    return res
      .status(400)
      .send({ errors: { global: "your account is activated" } });
  }
  const token = await tokenModel
    .findOne({
      userId: req.params.id
    })
    .exec();
  if (!token) {
    return res.status(400).send({
      errors: {
        global:
          "you have no account activation token, pls contact our administration"
      }
    });
  }
  sendEmail(user, token.token, keys.EMAIL.EMAIL_REASON.ACCOUNT_ACTIVATION);

  return res.send({
    success: {
      global: "the account activation e-mail was resent to " + user.email
    }
  });
};

//------------------------ accountActivationController
const accountActivationController = async (req, res) => {
  const token = await tokenModel
    .findOne({
      token: req.params.token
    })
    .exec();
  if (!token) {
    return res
      .status(400)
      .send({ errors: { global: "wrong activation token" } });
  }

  await userModel
    .findOneAndUpdate(
      { _id: token.userId },
      {
        $set: { isActive: true }
      }
    )
    .exec();
  await token.remove();
  return res.send({
    success: { global: "your account is now activated please try to login" }
  });
};

module.exports = {
  signInController,
  signUpController,
  accountActivationController,
  resendAccountActivationEmailController,
  signOutController,
  resetPasswordController,
  forgotPassword
};
