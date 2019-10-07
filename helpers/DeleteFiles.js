const fs = require("fs");
const path = require("path");

const deleteFileFromProject = async (fileName, directory, callback) => {
  await fs.unlink(
    path.join(__dirname, "/../client/public/images/", fileName),
    callback
  );
};

module.exports = { deleteFileFromProject };
