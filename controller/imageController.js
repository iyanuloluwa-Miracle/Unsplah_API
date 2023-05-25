
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Upload an image to Unsplash
const uploadImage = async (req, res, next) => {
  try {
    const imageFilePath = req.body.filePath; // Path to the image file on the server
    const imageData = fs.readFileSync(imageFilePath);

    const form = new FormData();
    form.append('image', imageData);

    const response = await axios.post('https://api.unsplash.com/photos', form, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        ...form.getHeaders()
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Delete an image from Unsplash
const deleteImage = async (req, res, next) => {
  try {
    const photoId = req.params.photoId;

    const response = await axios.delete(`https://api.unsplash.com/photos/${photoId}`, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

module.exports = { uploadImage, deleteImage };
