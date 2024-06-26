const File = require("../models/file.model"); // Ensure the path is correct to your 'auth' model
const multer = require("multer");
const path = require("path");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
  // filename: (req, file, cb) => {
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  // }
});
const upload = multer({ storage: storage });

const getAllFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json({message:"Data Fetch Success" , data : files});
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    console.log("HEllo file");
    const filePath = req.file.path;
    // console.log("filePath",filePath);
    const newFile = await File.create({ filepath: filePath });
    console.log("newFile", newFile);
    console.log(req.body);
    console.log("==>", req.file);
    res.status(201).json({ message: "File uploaded" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadMulFiles = async (req, res) => {
  try {
    const files = req.files;
    const filePaths = files.map((file) => ({ filepath: file.path }));
    const newFiles = await File.bulkCreate(filePaths);
    res.status(201).json({ message: "Multiple Files Uploaded Success" });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllFiles,
  upload,
  uploadFile,
  uploadMulFiles,
};
