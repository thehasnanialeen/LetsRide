const path = require('path');
const multer = require('multer');

// Configure the destination folder for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploaded files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    //console.log({req, file});
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

const uploadFileController = (req, res) => {
  try{
    //console.log({message: "reached", req: req.query});
    upload.array('files', 2)(req, res, (err) => {
      //console.log(req);
      if (err) {
        return res.status(400).json({ message: 'Error uploading file' });
      }

      //console.log({message: 'stage 1', file : req.file});
      if (!req.files) {
        return res.status(201).json({ message: 'No file uploaded' });
      }

      const filePaths = req.files.map((file) => file.path); // File path on the server

      res.status(200).json({ message: 'File uploaded successfully', filePaths });
    })
  } catch (error) {
    console.log({message: 'stage 4', error});
  }
};

module.exports = uploadFileController;;