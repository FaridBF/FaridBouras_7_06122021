const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

//Routage
router.post('/create', postCtrl.createPost);

module.exports = router;
