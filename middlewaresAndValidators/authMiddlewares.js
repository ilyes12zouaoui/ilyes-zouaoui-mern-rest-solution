const passport = require("passport");
const keys = require("../configs/keys_dev");

// authenticateAndLoadUser,
// authenticateUserOnly,
// simpleUserAuthorisation,
// adminAuthorisation,
// blogerAuthorisation

//authenticateAndLoadUser
const authenticateAndLoadUser = (req, res, next) => {
  passport.authenticate("jwt-load-user", { session: false }, function(
    err,
    user,
    info
  ) {
    if (!user)
      return res.status(401).send({ errors: { message: "unauthorized" } });

    req.user = user;
    return next();
  })(req, res);
};

const authenticateUserOnly = (req, res, next) => {
  passport.authenticate("jwt-only", { session: false }, function(
    err,
    user,
    info
  ) {
    if (!user)
      return res.status(401).send({ errors: { message: "unauthorized" } });

    req.user = user;
    return next();
  })(req, res);
};

//simpleUserAuthorisation
const authorisationForSimpleUser = (req, res, next) => {
  if (req.user.role != keys.USER_ROLES.SIMPLE)
    return res.status(403).send({ errors: { message: "forbidden" } });

  return next();
};

//adminAuthorisation
const authorisationForAdmin = (req, res, next) => {
  if (req.user.role != keys.USER_ROLES.ADMIN)
    return res.status(403).send({ errors: { message: "forbidden" } });

  return next();
};

//blogerAuthorisation
const authorisationForBloger = (req, res, next) => {
  if (req.user.role != keys.USER_ROLES.BLOGER)
    return res.status(403).send({ errors: { message: "forbidden" } });

  return next();
};

module.exports = {
  authenticateAndLoadUser,
  authenticateUserOnly,
  authorisationForAdmin,
  authorisationForBloger,
  authorisationForSimpleUser
};
