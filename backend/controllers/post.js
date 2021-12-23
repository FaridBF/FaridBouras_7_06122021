const db_connection = require('../config/database');

/**
 * Création d'un post
 * @param  {content, image, link, create_time, update_time, user_id} req : informations reçues par le front
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.createPost = (req, res) => {
  // si image ou link sont null, les supprimer
  if (req.body.image === null) delete req.body.image;
  if (req.body.link === null) delete req.body.link;
  const postToCreate = {
    ...req.body
  };
  const sql_query = `INSERT INTO post SET ?`;
  // connexion à la BDD
  const db = db_connection.getDB();
  // envoie de la requête SQL
  db.query(sql_query, postToCreate, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
      // Logger erreur dans la console du back
      //   throw err;
    } else {
      res
        .status(201)
        .json({ message: 'Votre publication a été créée avec succès !' });
    }
  });
};

/**
 * Récupération d'un post via l'ID
 * @param  {id} req : informations reçues par le front dans params
 * @param  {code, l'ensemble des données du post} res : réponse envoyée du back vers le front
 */
exports.getPostById = (req, res) => {
  const sql_query = `SELECT * FROM post WHERE id = ${req.params.id}`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    console.log(result);
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
      //   throw err;
    } else {
      res.status(200).json(result[0]);
    }
  });
};

/**
 * Suppression d'un post
 * @param  {id} req : informations reçues par le front dans params
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.deletePost = (req, res) => {
  // TODO: vérifier droits (admin ou user propriétaire)
  const sql_query = `DELETE FROM post WHERE id = ${req.params.id}`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(200)
        .json({ message: 'Votre publication a été supprimée avec succès' });
    }
  });
};
/**
 * Modification d'un post
 * @param  {content, image, link, user_id,} req : informations reçues par le front (id du post dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.updatePost = (req, res) => {
  // si image ou link sont null, les supprimer
  if (req.body.image === null) delete req.body.image;
  if (req.body.link === null) delete req.body.link;
  const postToUpdate = {
    ...req.body
  };
  const sql_query = `UPDATE post SET ? , update_time = NOW()  WHERE id = "${req.params.id}"`;
  const db = db_connection.getDB();
  db.query(sql_query, postToUpdate, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(201)
        .json({ message: 'Votre publication a été modifiée avec succès !' });
    }
  });
};
