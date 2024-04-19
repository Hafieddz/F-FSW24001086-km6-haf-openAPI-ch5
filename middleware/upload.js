const multer = require("multer");

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "File yang diinput tidak sesuai! (Harus format png, jpg, dan jpeg"
      ),
      false
    );
  }
};

const upload = multer({
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
  });

module.exports = upload;
