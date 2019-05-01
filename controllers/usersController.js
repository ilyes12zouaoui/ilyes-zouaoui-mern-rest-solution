const userModel = require("../models/userModel");
const tokenModel = require("../models/tokenModel");
const keys = require("../configs/keys_dev");
const sendEmail = require("../helpers/email/SendEmail");
const _ = require("lodash");
//
// promoteUser,
// demoteUser,
// banUser,
// releaseBannedUser,
// getUsers,
// getUserById,
//deleteUserById
//---------------banUser
const deleteUserById = async (req, res) => {
  const user = await userModel.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(400).send({ error: { global: "no user was found" } });
  return res.status(200).send({
    success: { global: "user is deleted" }
  });
};
const banUser = async (req, res) => {
  await userModel.update(
    { _id: req.params.id },
    {
      $set: {
        isBanned: true
      }
    }
  );

  return res.status(200).send({
    success: { global: "user is banned" }
  });
};
//---------------promoteUserController
const releaseBannedUser = async (req, res) => {
  await userModel.update(
    { _id: req.params.id },
    {
      $set: {
        isBanned: false
      }
    }
  );

  return res.status(200).send({
    success: { global: "user is released from ban" }
  });
};
//---------------promoteUserController
const promoteUser = async (req, res) => {
  await userModel.update(
    { _id: req.params.id },
    {
      $set: {
        role: keys.USER_ROLES.BLOGER
      }
    }
  );

  return res.status(200).send({
    success: { global: "user is promoted" }
  });
};
//---------------demoteUserController
const demoteUser = async (req, res) => {
  await userModel.update(
    { _id: req.params.id },
    {
      $set: {
        role: keys.USER_ROLES.SIMPLE
      }
    }
  );

  return res.status(200).send({
    success: { global: "user is promoted" }
  });
};

//-------------------getUsers
const getUsers = async (req, res) => {
  const users = await userModel.find().exec();

  return res.send(users);
};
//-------------------getUserById
const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id).exec();

  return res.send(user);
};
module.exports = {
  promoteUser,
  demoteUser,
  banUser,
  releaseBannedUser,
  getUsers,
  getUserById,
  deleteUserById
};
