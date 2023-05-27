const express = require('express');
const imageController = require('../controller/imageController');
const router = require('express').Router();


// Routes
router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/', imageController.uploadFile);
router.get('/uploads/:filename', imageController.getFile)

module.exports = router;
// routes/imageRoutes.js


