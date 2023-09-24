const fileUpload = require("../controllers/uploadController");
const multer = require('multer')
const path = require("path");
const express = require("express");
const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "../", "uploads/") });

router.post("/", upload.single('image'), fileUpload);

module.exports = router;