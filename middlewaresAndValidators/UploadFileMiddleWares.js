const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/public/images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.random()
        .toString(36)
        .substring(7) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

const uploadFileByName = fileInputName => {
  return upload.single(fileInputName);
};

module.exports = { uploadFileByName };
