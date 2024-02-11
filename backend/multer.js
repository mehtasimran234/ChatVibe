const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./backend/images");
  },
  filename: function (req, file, cb) {
    return cb(null, uuidv4() + "-" + Date.now() + "-" + file.originalname);
  },
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif|svg)$/)) {
      return cb(new Error("Please upload a valid image"));
    }
    cb(undefined, true);
  },
});

const upload = multer({ storage: multerStorage });

module.exports = upload;
