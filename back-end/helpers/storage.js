const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    console.log("File:", file);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

module.exports = storage;
