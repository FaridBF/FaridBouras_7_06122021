const express = require('express');
const router = express.Router(); // création du routeur avec la fonction express
const userCtrl = require('../controllers/user');

//Routage
// inscripton et connexion
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// modififer et suppresion d'un user
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

// paramètrage des droits (admin) d'un user
router.put('/:id/adminrights', userCtrl.setAdminUser);

// affichage de l'ensemble des données du User sans le mot de passe
router.get('/:id', userCtrl.getUserDetails);

module.exports = router;
