const db_connection = require('../config/database');

/**
 * Création d'un commentaire
 * @param  {content, user_id, post_id} req : informations reçues par le front
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.createComment = (req, res) => {
  const sql_query = `INSERT INTO comment (content, user_id, post_id) VALUES ("${req.body.content}", "${req.body.user_id}", "${req.body.post_id}"); `;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
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

/**
 * Récupération de la liste des commentaires par publication
 * @param {*} req : id de la publication (id de la publication dans params)
 * @param {*} res : réponse envoyée du back vers le front
 */
exports.getCommentsList = (req, res) => {
  const sql_query = `SELECT * FROM comment WHERE comment.post_id = "${req.params.id}" ORDER BY comment.create_time DESC;`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res.status(200).json(result);
    }
  });
};

/**
 * Récupération d'un commentaire par un id avec infos du user également
 * @param {*} req (id du commentaire dans params)
 * @param {*} res : réponse envoyée du back vers le front
 */
// TODO: non utilisé pour la V1, voir pour la V2
exports.getCommentById = (req, res) => {
  const sql_query = `SELECT user.is_admin, user.first_name, user.last_name, user.picture, comment.id, comment.user_id AS author_id, comment.post_id, comment.create_time, comment.content 
  FROM comment
  LEFT JOIN user 
  ON comment.user_id=user.id 
  WHERE comment.id = "${req.params.id}";`;
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
 * Récupération d'un commentaire par un id avec infos du user également
 * @param {*} req (id du commentaire dans params)
 * @param {*} res : réponse envoyée du back vers le front
 */
exports.getCommentsListByPostId = (req, res) => {
  const sql_query = `SELECT user.is_admin, user.first_name, user.last_name, user.picture, comment.id, comment.user_id AS author_id, comment.post_id, comment.create_time, comment.content 
  FROM comment
  LEFT JOIN user 
  ON comment.user_id=user.id 
  WHERE comment.post_id = "${req.params.id}"
  ORDER BY comment.create_time DESC;`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      res.status(200).json(result);
    }
  });
};
