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
