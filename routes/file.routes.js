
const express = require("express");
const { getAllFiles , upload , uploadFile } = require("../controller/fileController.js");
const router = express.Router();


router.get('/getAllFiles', getAllFiles);

// Route to upload a file
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;