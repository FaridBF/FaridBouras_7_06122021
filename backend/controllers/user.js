// permet un cryptage sécurisé avec un algorithme unidirectionnel.
const bcrypt = require('bcrypt');

// Chrgt des variables d'env° du fichier .env dans process.env
const dotenv = require('dotenv');
dotenv.config();

const db_connection = require('../config/database');

/**
 * Inscription d'un utilisateur classique (non admin)
 * @param  {} req : informations utilisateur reçues par le front
 * @param  {} res : réponse envoyée du back vers le front
 */
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10) // hash permet de crypter le mdp
    .then((hash) => {
      const userToCreate = {
        ...req.body,
        password: hash
      };
      const sql_query = `INSERT INTO user (is_admin, first_name, last_name, email, password, picture, create_time, update_time) VALUES (0, "${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${hash}", NULL, NOW(), NOW());`;
      // connexion à la BDD
      const db = db_connection.getDB();
      // envoie de la requête SQL
      db.query(sql_query, userToCreate, (err, result) => {
        if (!result) {
          res.status(400).json({ err });
          // console.log('erreur', err);
        } else {
          res.status(201).json({ message: 'Utilisateur créé avec succès !' });
          // console.log('ok');
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
  // .catch((error) => console.log(error));
};
