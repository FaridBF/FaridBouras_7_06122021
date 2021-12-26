const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/create', auth, commentCtrl.createComment);

router.put('/:id', auth, commentCtrl.updateComment);

router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
