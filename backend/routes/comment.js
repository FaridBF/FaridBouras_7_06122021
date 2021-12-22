const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/create', commentCtrl.createComment);

module.exports = router;
