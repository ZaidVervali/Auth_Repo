
const express = require("express");
const { getAllFiles , upload , uploadFile ,uploadMulFiles, deleteFile } = require("../controller/fileController.js");
const router = express.Router();


router.get('/getAllFiles', getAllFiles);
router.delete('/delete/:id', deleteFile);

// Route to upload a file
router.post('/upload', upload.single('file'), uploadFile);
router.post('/uploadMul', upload.array('files', 10), uploadMulFiles); // 'files' is the name of the field in the form, 10 is the max number of files

module.exports = router;