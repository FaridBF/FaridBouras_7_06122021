const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post('/create', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getPostById);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

//like and dislike
router.post('/opinion/:id', auth, postCtrl.giveOpinion);

module.exports = router;
