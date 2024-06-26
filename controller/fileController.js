const File = require('../models/file.model'); // Ensure the path is correct to your 'auth' model
const multer = require('multer');
const path = require('path');


// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'uploads'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const getAllFiles = async (req,res)=>{
    try {
        
        console.log("Hello World");
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });    
    }
}

const uploadFile = async (req, res) => {
    try {
        console.log("HEllo file");
        const filePath = req.file.path;
        // console.log("filePath",filePath);
        const newFile = await File.create({ filepath: filePath });
        console.log("newFile",newFile);
        console.log(req.body)
        console.log("==>",req.file)
        res.status(201).json({message :"File uploaded"});
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllFiles,
    upload,
    uploadFile,
};
