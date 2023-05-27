const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Handle file upload
exports.uploadFile = async (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ error: 'Error: No file selected!' });
      } else {
        // Get the dimensions of the uploaded image
        const dimensions = sizeOf(req.file.path);
        const width = dimensions.width;
        const height = dimensions.height;
        // Send response to client
        res.json({ message: 'File uploaded!', file: req.file, width, height });
      }
    }
  });
};


// Getting the File that was uploaded

exports.getFile = async (req, res) => {
  const filePath = path.join(__dirname, '../public/uploads/', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found!' });
  }
}
