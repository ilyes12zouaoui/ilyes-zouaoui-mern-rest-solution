const fs = require("fs");
const path = require("path");

const deleteFileFromPublic = async (fileName, callback) => {
  console.log(path.join(__dirname, "/../public/", fileName));
  await fs.unlink(path.join(__dirname, "/../public/", fileName), callback);
};

module.exports = { deleteFileFromPublic };
