// permet un cryptage sécurisé avec un algorithme unidirectionnel.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Chrgt des variables d'env° du fichier .env dans process.env
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const db_connection = require('../config/database');

// Cookie/token
const maxAge = '24h';
const createToken = (id) => {
  return jwt.sign(
    { userId: id }, // user id: identifiant utilisateur
    process.env.SECRET_TOKEN,
    { expiresIn: maxAge }
  );
};

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
        picture: `${req.protocol}://${req.get(
          'host'
        )}/images/default/defaultAvatar.png`
      };
      const sql_query = `
      INSERT INTO user (is_admin, first_name, last_name, email, password, picture, create_time, update_time) 
      VALUES (0, "${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${hash}",
      "${userToCreate.picture}", NOW(), NOW());`;
      // connexion à la BDD
      const db = db_connection.getDB();
      // envoie de la requête SQL
      db.query(sql_query, userToCreate, (err, result) => {
        if (!result) {
          res.status(400).json({ err });
        } else {
          res.status(201).json({ message: 'Utilisateur créé avec succès !' });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
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
    if (!result) {
      res.status(400).json({ error: 'Une erreur est survenue' });
    } else if (result.length === 0) {
      res.status(204).json({ message: 'Email incorrect !' });
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
          const token = createToken(userFound.id);
          res.cookie('jwt', token, { httpOnly: true, expiresIn: maxAge });
          res.status(200).json({
            userId: userFound.id
          });
        });
    }
  });
};

/**
 * Affichage de l'ensemble des données du User sans le mot de passe
 * @param  {is_admin, first_name, last_name, email, picture, create_time, update_time}
 * req : informations utilisateur reçues par le front
 * @param  {code, l'ensemble des données du User sans le mot de passe} res : réponse envoyée du back vers le front
 */
exports.getUserDetails = (req, res) => {
  const sql_query = `SELECT * FROM user WHERE id = ${req.params.id};`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    // console.log(result);
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

/**
 * Obtenir les droits d'utilisateur
 * @param {email} req : email de l'utilisateur recherché
 * @param {} res : réponse envoyée du back vers le front
 */
exports.getUserRightsByEmail = (req, res) => {
  const sql_query = `SELECT id, email, is_admin FROM user WHERE email = "${req.body.email}";`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    console.log(result);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else if (result.length === 0) {
      res.status(204).json({
        message:
          'Aucun utilisateur trouvé avec cette adresse email. Veuillez réessayer.'
      });
    } else {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    }
  });
};

/**
 * Permet de modifier les droits admin d'un User quand on est admin
 * @param  {id} : informations reçues par le front (id du user qui appelle la requête dans params)
 * @param  {id, is_admin} req.body : informations reçues par le front concernant le user à modifier
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.setAdminUser = (req, res) => {
  const userToAdmin = {
    ...req.body
  };

  const sql_query_verify = `SELECT id, is_admin FROM user WHERE id = "${req.params.id}";`;
  const sql_query_update_admin = `
  UPDATE user SET is_admin = "${userToAdmin.is_admin}", update_time = NOW() WHERE id = "${userToAdmin.id}";`;
  const db = db_connection.getDB();
  db.query(sql_query_verify, (err, result) => {
    // Vérifier si le user qui fait la demande est un admin
    if (result[0].is_admin === 1) {
      // Si le user qui fait la demande est un admin, continuer
      db.query(sql_query_update_admin, (err, result) => {
        console.log('result set admin', result);
        if (result) {
          res.status(200).json({
            message: `Les droits de l'utilisateur lié à l'adresse email "${userToAdmin.email}" ont été modifiés !`
          });
        } else {
          res.status(400).json({ message: 'Une erreur est survenue set.' });
        }
      });
    } else if (result[0].is_admin === 0) {
      res.status(401).json({
        message: "Vous n'avez pas les droits pour réaliser cette action."
      });
    } else {
      res.status(400).json({ message: 'Une erreur est survenue.' });
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
  const sql_query = `
  UPDATE user SET first_name = "${userToUpdate.first_name}", last_name = "${userToUpdate.last_name}", 
  update_time = NOW() WHERE id = "${req.params.id}";`;
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
 * Modification de l'image de profil d'un User
 * @param  {id, picture} req : informations reçues par le front (id du user dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.updateUserImage = async (req, res) => {
  // console.log('change image back', req.file);
  // TROUVER UTILISATEUR ET SUPPRIMER SON IMAGE SI DIFFERENTE DE CELLE PAR DEFAUT
  const db = db_connection.getDB();
  const sql_query_find_old_picture = `SELECT picture FROM user WHERE id = ${req.params.id};`;
  // trouver image de ce user
  db.query(await sql_query_find_old_picture, (err, result) => {
    if (result) {
      // si ce n'est pas l'image par défaut
      // (si elle n'est pas dans le dossier default)
      const picture_found = result[0].picture;
      if (!picture_found.includes('/default/')) {
        // la supprimer du dossier 'images'
        const imageToRemove = picture_found.split('/images/')[1];
        fs.unlink(`images/${imageToRemove}`, () => {
          console.log('Image de profil supprimée avec succès !');
        });
      }
    }
  });
  // si pas d'image envoyé par le front, supprimer req.body.picture
  if (req.body.picture === null) delete req.body.picture;
  // console.log('---REQ.BODY---', req.body);
  // console.log('---REQ.FILE---', req.file);
  const userToUpdate = {
    ...req.body,
    // sauvegarde du chemin de l'image
    // si un fichier est envoyé, sauvegarder nom donné par multer, sinon, avatar par défaut
    picture: req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : `${req.protocol}://${req.get('host')}/images/default/defaultAvatar.png`
  };
  const sql_query = `
  UPDATE user SET picture = "${userToUpdate.picture}", update_time = NOW() WHERE id = "${req.params.id}";`;
  db.query(sql_query, (err) => {
    if (err) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(200)
        .json({ message: "L'image de profil a été modifiée avec succès !" });
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
        .status(200)
        .json({ message: "L'utilisateur a bien été supprimé avec succès !" });
    }
  });
};

/**
 * Permet la déconnexion d'un utilisateur en vidant le cookie
 * @param  {} req : aucun
 * @param  {} res : jwt (token vide)
 */
exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/'); // pr que la requête aboutisse
};
