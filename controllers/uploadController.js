const multer = require("multer");
const path = require("path");
const imagesPath = path.join(__dirname, "../images");


// Multer configuration for images upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
    //new Date().toISOString().replace(/:/g,'-')
  },
});
const upload = multer({ storage });


/**
 * @desc Upload file
 * @route /api/upload
 * @method POST
 * @access public
 */
const uploadFile = (req, res) => {
  res.status(200).json({ message: "image uploaded" });
};

module.exports = { upload, uploadFile };

