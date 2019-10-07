const fileExistsValidator = (req, res, next) => {
  if (req.file == null)
    return res.status(400).send({ errors: { golbal: "no file was sent" } });

  next();
};

module.exports = { fileExistsValidator };
