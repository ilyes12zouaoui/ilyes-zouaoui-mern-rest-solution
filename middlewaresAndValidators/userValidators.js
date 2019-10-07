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
// deleteUserValidator,
// updatePassword,
// updateProfile

//----------------- updateProfile
const updateProfile = (req, res, next) => {
  console.log(req);
  schema = {
    firstName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    lastName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    gender: Joi.boolean().required(),
    phoneNumber: Joi.number(),
    birthDate: Joi.date().required()
  };
  console.log("body", req.body);
  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};
//----------------- updatePassword
const updatePassword = (req, res, next) => {
  schema = {
    password: Joi.string()
      .max(50)
      .min(5)
      .required(),
    confirmationPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .options({
        language: {
          any: {
            allowOnly: "do not match"
          }
        }
      })
  };

  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};

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
  getUserByIdValidator,
  updatePassword,
  updateProfile
};
