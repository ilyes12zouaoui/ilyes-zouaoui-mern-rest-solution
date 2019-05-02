const isEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const isObjectId = id => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
const isToken = id => id.match(/^[0-9a-fA-F]{40}$/);
const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

//example of use for isEmpty
// if (isEmpty(req.body))
// return res.status(400).send({ errors: { message: "empty request" } });

module.exports = {
  isEmail: isEmail,
  isObjectId: isObjectId,
  isEmpty: isEmpty,
  isToken
};
