const { body } = require('express-validator');
const imageController = require('../controller/imageController');
const router = require('express').Router();

// Example validation for the upload endpoint
const uploadImageValidation = [
  body('filePath').notEmpty().withMessage('File path is required.'),
];

// Routes
router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/upload', uploadImageValidation, imageController.uploadImage);
router.delete('/delete/:photoId', imageController.deleteImage);

module.exports = router;
// routes/imageRoutes.js


