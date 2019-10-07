const router = require("express").Router();
const authMiddleWares = require("../middlewaresAndValidators/authMiddleWares");
const userValidators = require("../middlewaresAndValidators/userValidators");
const userController = require("../controllers/usersController");
const uploadFileMiddleWares = require("../middlewaresAndValidators/UploadFileMiddleWares");

const uploadFileValidators = require("../middlewaresAndValidators/UploadFileValidators");

//demoteUser,
// banUser,
// releaseBannedUser,
// getUsers,
// getUserById,
//deleteUserById
//updateProfileImage
//updatepassword
//updateProfile
//router.use(authMiddleWares.authenticateAndLoadUser);

router.put(
  "/updateProfile",
  authMiddleWares.authenticateAndLoadUser,
  userValidators.updateProfile,
  userController.updateProfile
);
router.put(
  "/updatePassword",
  authMiddleWares.authenticateAndLoadUser,
  userValidators.updatePassword,
  userController.updatePassword
);
router.put(
  "/updateProfileImage",
  authMiddleWares.authenticateAndLoadUser,

  uploadFileMiddleWares.uploadFileByName("image"),
  uploadFileValidators.fileExistsValidator,
  userController.updateProfileImage
);

router.put(
  "/demote/:id",
  userValidators.demoteUserValidator,
  userController.demoteUser
);

router.put(
  "/promote/:id",
  userValidators.promoteUserValidator,
  userController.promoteUser
);

router.put("/ban/:id", userValidators.banUserValidator, userController.banUser);

router.put(
  "/releaseBan/:id",
  authMiddleWares.authenticateAndLoadUser,
  userController.releaseBannedUser
);

router.get(
  "/",

  userController.getUsers
);

router.get(
  "/:id",
  userValidators.getUserByIdValidator,
  userController.getUserById
);

router.delete(
  "/:id",
  userValidators.deleteUserValidator,
  userController.deleteUserById
);

// router.get("/test", authMiddleWares.authentication, (req, res) => {
//   res.send(req.user);
// });

// router.get("/getAllUsers", userController.getAllUserController);

// router.delete("/deleteUser/:id", userController.deleteUserByIdController);

module.exports = router;
