// permet un cryptage sécurisé avec un algorithme unidirectionnel.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Chrgt des variables d'env° du fichier .env dans process.env
const dotenv = require('dotenv');
dotenv.config();

const db_connection = require('../config/database');

/**
 * Inscription d'un utilisateur classique (non admin)
 * @param  {first_name, last_name, email, password} req : informations utilisateur reçues par le front
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10) // hash permet de crypter le mdp
    .then((hash) => {
      const userToCreate = {
        ...req.body,
        password: hash,
        // Image par défaut avatar
        picture: `${req.protocol}://${req.get('host')}/images/defaultAvatar.png`
      };
      const sql_query = `INSERT INTO user (is_admin, first_name, last_name, email, password, picture, create_time, update_time) VALUES (0, "${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${hash}", "${userToCreate.picture}", NOW(), NOW());`;
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

/**
 * Connexion d'un utilisateur
 * @param  {email, password} req : informations utilisateur reçues par le front
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.login = (req, res) => {
  const userToLogin = {
    ...req.body
  };
  const sql_query_login = `SELECT * FROM user WHERE email = "${userToLogin.email}";`;
  const db = db_connection.getDB();
  db.query(sql_query_login, userToLogin, async (err, result) => {
    // console.log(result);
    if (!result) {
      res.status(400).json({ err });
    } else {
      // si utilisateur trouvé en BDD, récupérer données suivantes
      const userFound = {
        id: result[0].id,
        hashedPassword: result[0].password
      };
      await bcrypt
        .compare(userToLogin.password, userFound.hashedPassword)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            token: jwt.sign(
              // envoie d'un token en chaîne de caractère
              { userId: userFound.id }, // user id: identifiant utilisateur
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            ),
            userId: userFound.id
          });
          // console.log(res);
        });
      res.status(200).json({ message: 'Utilisateur connecté avec succès !' });
    }
  });
};

/**
 * Affichage de l'ensemble des données du User sans le mot de passe
 * @param  {is_admin, first_name, last_name, email, picture, create_time, update_time} req : informations utilisateur reçues par le front
 * @param  {code, l'ensemble des données du User sans le mot de passe} res : réponse envoyée du back vers le front
 */
exports.getUserDetails = (req, res) => {
  const sql_query = `SELECT is_admin, first_name, last_name, email, picture, create_time, update_time FROM user WHERE id = ${req.params.id};`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

/**
 * Modification d'un User
 * @param  {id, first_name, last_name} req : informations reçues par le front (id du user dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.updateUser = (req, res) => {
  // si filename, changer chemin de filename sinon
  // if (req.body.picture === null) delete req.body.picture;
  const userToUpdate = {
    ...req.body,
    // sauvegarde du chemin de l'image
    // si un fichier est envoyé, sauvegarder nom donné par multer, sinon, avatar par défaut
    picture: `${req.protocol}://${req.get('host')}/images/${
      req.file ? req.file.filename : 'defaultAvatar.png'
    }`
  };
  const sql_query = `UPDATE user SET first_name = "${userToUpdate.first_name}", last_name = "${userToUpdate.last_name}", update_time = NOW() WHERE id = "${req.params.id}";`;
  const db = db_connection.getDB();
  // db.query(sql_query, userToUpdate, (err, result) => {
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(200)
        .json({ message: "L'utilisateur a été modifié avec succès !" });
    }
  });
};

/**
 * Suppresion d'un User
 * @param  {id} req : informations reçues par le front (id du user dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.deleteUser = (req, res) => {
  const sql_query = `DELETE FROM user WHERE id = ${req.params.id};`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(201)
        .json({ message: "L'utilisateur a bien été supprimé avec succès !" });
    }
  });
};

/**
 * Permet de modifier les droits admin d'un User
 * @param  {id, is_admin} req : informations reçues par le front (id du user dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.setAdminUser = (req, res) => {
  const userToAdmin = {
    ...req.body
  };
  const sql_query = `UPDATE user SET is_admin = "${userToAdmin.is_admin}", update_time = NOW() WHERE id = "${req.params.id}";`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res.status(200).json({ message: 'Vos droits ont été modifiés !' });
    }
  });
};
