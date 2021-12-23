const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

//Routage
router.post('/create', postCtrl.createPost);
router.get('/:id', postCtrl.getPostById);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;
