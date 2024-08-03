const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const storage = require("../helpers/storage");
const fileParser = require("../helpers/fileParser");

const upload = multer({ storage }).single("file");

const uploadRoute = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const path = req.file.path;

    try {
      const fileData = await fileParser(path);
      fs.unlinkSync(path);
      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: fileData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Failed to parse file",
      });
    }
  });
};

module.exports = uploadRoute;
