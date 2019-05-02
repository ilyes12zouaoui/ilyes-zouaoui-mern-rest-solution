const Joi = require("joi");
const { isEmpty, isToken, isObjectId } = require("../helpers/CustomValidators");
const joiErrorMessageChange = require("../helpers/JoiErrorMessageChange");

//

// signInValidator,
// signUpValidator,
// accountActivationValidator,
// sendAccountActivationEmailValidator
// resetPasswordValidator
//forgotPasswordValidator

//----------------- signInValidator
const signInValidator = (req, res, next) => {
  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};

//------------ signUpValidator
const signUpValidator = (req, res, next) => {
  schema = {
    firstName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    lastName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    gender: Joi.boolean().required(),
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
      }),
    phoneNumber: Joi.number(),
    birthDate: Joi.date().required()
  };

  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};

//-------------- accountActivationValidator
const accountActivationValidator = (req, res, next) => {
  if (!isToken(req.params.token))
    return res
      .status(400)
      .send({ errors: { global: "wrong activation token" } });

  next();
};

//------------- resendAccountActivationEmailValidator
const resendAccountActivationEmailValidator = (req, res, next) => {
  if (!isObjectId(req.params.id))
    return res.status(400).send({
      errors: { global: "wrong credentials" }
    });

  next();
};

//----------- resetPasswordValidator
const resetPasswordValidator = (req, res, next) => {
  if (!isToken(req.params.token) || isEmpty(req.body.password))
    return res.status(400).send({
      errors: { global: "wrong credentials" }
    });

  next();
};

//----------- forgotPasswordValidator
const forgotPasswordValidator = (req, res, next) => {
  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
  };

  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};

module.exports = {
  signInValidator: signInValidator,
  signUpValidator: signUpValidator,
  accountActivationValidator,
  resendAccountActivationEmailValidator,
  resetPasswordValidator,
  forgotPasswordValidator
};
