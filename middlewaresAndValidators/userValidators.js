const Joi = require("joi");
const { isEmpty, isToken, isObjectId } = require("../helpers/CustomValidators");
const joiErrorMessageChange = require("../helpers/JoiErrorMessageChange");

//

//
// promoteUserValidator,
// demoteUserValidator,
// banUserValidator,
// releasebannedUserValidator,
// getUsersValidator,
// getUserByIdValidator,
// deleteUserValidator

//----------------- getUsersValidator
const deleteUserValidator = (req, res, next) => {
  const result = isObjectId(req.params.id);
  if (!result)
    return res.status(400).send({ errors: { global: "bad credentials" } });

  return next();
};
//----------------- getUsersValidator
const getUserByIdValidator = (req, res, next) => {
  const result = isObjectId(req.params.id);

  if (!result)
    return res.status(400).send({ errors: { global: "bad credentials" } });

  return next();
};
//----------------- banUserValidator
const banUserValidator = (req, res, next) => {
  const result = isObjectId(req.params.id);
  if (!result)
    return res.status(400).send({ errors: { global: "bad credentials" } });

  return next();
};
//----------------- releasebannedUserValidator
const releasebannedUserValidator = (req, res, next) => {
  const result = isObjectId(req.params.id);
  if (!result)
    return res.status(400).send({ errors: { global: "bad credentials" } });

  return next();
};
//----------------- signInValidator
const promoteUserValidator = (req, res, next) => {
  const result = isObjectId(req.params.id);
  if (!result)
    return res.status(400).send({ errors: { global: "bad credentials" } });

  return next();
};
//----------------- demoteUserValidator
const demoteUserValidator = (req, res, next) => {
  const result = isObjectId(req.params.id);
  if (!result)
    return res.status(400).send({ errors: { global: "bad credentials" } });

  return next();
};

module.exports = {
  promoteUserValidator,
  demoteUserValidator,
  banUserValidator,
  releasebannedUserValidator,
  deleteUserValidator,
  getUserByIdValidator
};
