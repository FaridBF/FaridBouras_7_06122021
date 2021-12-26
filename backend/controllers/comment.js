const db_connection = require('../config/database');

/**
 * Création d'un commentaire
 * @param  {content, user_id, post_id} req : informations reçues par le front
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.createComment = (req, res) => {
  const commentToCreate = {
    ...req.body
  };
  const sql_query = `INSERT INTO comment SET ?`;
  const db = db_connection.getDB();
  db.query(sql_query, commentToCreate, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(201)
        .json({ message: 'Votre commentaire a été créé avec succès !' });
    }
  });
};

/**
 * Suppression d'un commentaire
 * @param  {id} req : informations reçues par le front (id du comment dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.deleteComment = (req, res) => {
  const commentToDelete = {
    ...req.body
  };
  const sql_query = `DELETE FROM comment WHERE id = ${req.params.id}`;
  const db = db_connection.getDB();
  db.query(sql_query, commentToDelete, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(200)
        .json({ message: 'Votre commentaire a été supprimé avec succès !' });
    }
  });
};

/**
 * Modification d'un commentaire
 * @param  {id, content, update_time} req : informations reçues par le front (id du comment dans params)
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.updateComment = (req, res) => {
  const sql_query = `UPDATE comment SET content = "${req.body.content}", update_time = NOW() WHERE id = "${req.params.id}"`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res
        .status(200)
        .json({ message: 'Votre commentaire a été modifié avec succès !' });
    }
  });
};
