const router = require("express").Router();
const authMiddleWares = require("../middlewaresAndValidators/authMiddleWares");
const authValidators = require("../middlewaresAndValidators/authValidators");
const authController = require("../controllers/authController");

router.post(
  "/signIn",
  authValidators.signInValidator,
  authController.signInController
);

router.post(
  "/signUp",
  authValidators.signUpValidator,
  authController.signUpController
);

router.delete(
  "/signOut",
  (req, res, next) => {
    console.log("head :", req.headers);
    next();
  },
  authMiddleWares.authenticateAndLoadUser,
  authController.signOutController
);

router.get(
  "/accountActivation/:token",
  authValidators.accountActivationValidator,
  authController.accountActivationController
);

router.get(
  "/resendAccountActivationEmail/:id",
  authValidators.resendAccountActivationEmailValidator,
  authController.resendAccountActivationEmailController
);

router.post(
  "/forgotPassword",
  authValidators.forgotPasswordValidator,
  authController.forgotPassword
);

router.put(
  "/resetPassword/:token",
  authValidators.resetPasswordValidator,
  authController.resetPasswordController
);

// router.get("/test", authMiddleWares.authentication, (req, res) => {
//   res.send(req.user);
// });

// router.get("/getAllUsers", authController.getAllUserController);

// router.delete("/deleteUser/:id", authController.deleteUserByIdController);

module.exports = router;
