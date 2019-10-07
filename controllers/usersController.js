const userModel = require("../models/userModel");
const tokenModel = require("../models/tokenModel");
const keys = require("../configs/keys_dev");
const sendEmail = require("../helpers/email/SendEmail");
const _ = require("lodash");

const { deleteFileFromProject } = require("../helpers/DeleteFiles");
//
// promoteUser,
// demoteUser,
// banUser,
// releaseBannedUser,
// getUsers,
// getUserById,
//deleteUserById

//updateProfileImage
// updatePassword
// updateProfile

//---------------updatePassword
const updateProfile = async (req, res) => {
  req.user.firstName = req.body.firstName;
  req.user.lastName = req.body.lastName;
  req.user.phoneNumber = req.body.phoneNumber;
  req.user.birthDate = req.body.birthDate;
  req.user.gender = req.body.gender;

  req.user = await req.user.save();
  user = req.user.toObject();
  user.id = user._id;
  user = _.omit(user, ["__v", "_id"]);
  return res.send({
    success: {
      global: "your profile informations were updated successfully",
      user
    }
  });
};
//---------------updatePassword
const updatePassword = async (req, res) => {
  req.user.password = req.body.password;
  console.log(req.user.password);
  await req.user.encryptPassword();
  await req.user.save();
  return res.send({
    success: { global: "your password was updated successfully" }
  });
};

//-----------updateProfileImage
const updateProfileImage = async (req, res) => {
  const directory = "/../client/public/images/";

  const oldImagePath = req.user.image;

  req.user.image = req.file.filename;

  if (oldImagePath == "defaultProfilePicture.jpg") {
    await req.user.save();
    return res.send({
      success: {
        global: "profile picture was updated successfuly",
        imageName: req.file.filename
      }
    });
  } else {
    deleteFileFromProject(oldImagePath, directory, async err => {
      await req.user.save();
      return res.send({
        success: {
          global: "profile picture was updated successfuly",
          imageName: req.file.filename
        }
      });
    });
  }
};
//---------------deleuserbyidz
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
  deleteUserById,
  updateProfileImage,
  updatePassword,
  updateProfile
};
