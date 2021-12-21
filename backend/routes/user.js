const express = require('express');
const router = express.Router(); // création du routeur avec la fonction express
const userCtrl = require('../controllers/user');

//Routage
router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

module.exports = router;
