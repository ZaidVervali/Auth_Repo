
const express = require("express");
const { getAllFiles , upload , uploadFile ,uploadMulFiles } = require("../controller/fileController.js");
const router = express.Router();


router.get('/getAllFiles', getAllFiles);

// Route to upload a file
router.post('/upload', upload.single('file'), uploadFile);
router.post('/uploadMul', upload.array('files', 10), uploadMulFiles); // 'files' is the name of the field in the form, 10 is the max number of files

module.exports = router;