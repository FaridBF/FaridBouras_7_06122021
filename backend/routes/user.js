const express = require('express');
const router = express.Router(); // création du routeur avec la fonction express
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
// inscripton et connexion
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

// modififer et suppresion d'un user
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

// paramètrage des droits (admin) d'un user
router.put('/:id/adminrights', auth, userCtrl.setAdminUser);

// affichage de l'ensemble des données du User sans le mot de passe
router.get('/:id', auth, userCtrl.getUserDetails);
// router.get('/:id', userCtrl.getUserDetails);

module.exports = router;
