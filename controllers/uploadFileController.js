const path = require('path');
const multer = require('multer');

// Configure the destination folder for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploaded files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fileName); 
  },
});

const upload = multer({ storage });

const uploadFileController = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }

    if (!req.file) {
      return res.status(201).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path; // File path on the server

    res.status(200).json({ message: 'File uploaded successfully', filePath });
  });
};

module.exports = {
  uploadFile,
};