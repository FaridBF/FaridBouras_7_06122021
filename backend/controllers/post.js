const db_connection = require('../config/database');

const fs = require('fs'); // accès aux # opérations liés au système de fichiers
const { json } = require('express');

/**
 * Création d'un post
 * @param  {content, image, link, create_time, update_time, user_id} req : informations reçues par le front
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.createPost = (req, res) => {
  // si image ou link sont null, les supprimer
  // if (req.body.image === null) delete req.body.image;
  if (req.body.link === null || req.body.link.length === 0)
    delete req.body.link;
  const postToCreate = {
    ...req.body,
    image: req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : null
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

exports.getPostsList = (req, res) => {
  // const sql_query =
  //   "SELECT * FROM post, user WHERE post.user_id=user.id ORDER BY post.create_time DESC;";
  const sql_query =
    'SELECT post.id, post.content, post.image, post.link, post.create_time, post.user_id, user.is_admin, user.first_name, user.last_name, user.picture FROM post LEFT JOIN user ON post.user_id=user.id ORDER BY post.create_time DESC;';
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
 * Récupération d'un post via l'ID
 * @param  {id} req : informations reçues par le front dans params
 * @param  {code, l'ensemble des données du post} res : réponse envoyée du back vers le front
 */
exports.getPostById = (req, res) => {
  const sql_query = `SELECT * FROM post WHERE id = ${req.params.id};`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
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
  const sql_query_find_post = `SELECT * FROM post WHERE id = "${req.params.id}";`;
  const sql_query = `DELETE FROM post WHERE id = "${req.params.id}";`;
  const db = db_connection.getDB();
  // supprimer l'image du post
  db.query(sql_query_find_post, (err, result) => {
    if (err) {
      res.status(400).json({
        message:
          'Une erreur est survenue lors de la recherche de la publication.'
      });
    } else {
      // si image n'est pas null, la supprimer
      if (result[0].image !== null) {
        const filename = result[0].image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          console.log('Image de publication supprimée avec succès !');
        });
      }
      // supprimer le post
      db.query(sql_query, (err, result) => {
        if (!result) {
          res.status(400).json({
            message:
              'Une erreur est survenue lors de la suppression de la publication.'
          });
        } else {
          res.status(200).json({
            message: 'Votre publication a été supprimée avec succès !'
          });
        }
      });
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
        .status(200)
        .json({ message: 'Votre publication a été modifiée avec succès !' });
    }
  });
};

/**
 * Récupération du total de "likes" pour un post via l'ID
 * @param  {id} req : informations reçues par le front dans params
 * @param  {likersList, totalLikes} res : résultat envoyé au front
 */
exports.getTotalLikesByPostId = (req, res) => {
  const sql_query = `SELECT user_id FROM user_post_opinion WHERE post_id=${req.params.id} AND type=1;`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
      //   throw err;
    } else {
      // envoie au front la liste des likers et le total des likers
      res.status(200).json({ likersList: result, totalLikes: result.length });
    }
  });
};

/**
 * Récupération du total de "dislikes" pour un post via l'ID
 * @param  {id} req : informations reçues par le front dans params
 * @param  {dislikersList, totalDislikes} res : résultat envoyé au front
 */
exports.getTotalDislikesByPostId = (req, res) => {
  const sql_query = `SELECT user_id FROM user_post_opinion WHERE post_id=${req.params.id} AND type=-1;`;
  const db = db_connection.getDB();
  db.query(sql_query, (err, result) => {
    if (!result) {
      res.status(400).json({ message: 'Une erreur est survenue.' });
    } else {
      // envoie au front la liste des dislikers et le total des dislikers
      res
        .status(200)
        .json({ dislikersList: result, totalDislikes: result.length });
    }
  });
};

/**
 * Gestion de l'opinion (like, dislike ou sans opinion) d'un utilisateur sur une publication
 * @param  {user_id, post_id, type} req : informations reçues par le front
 * Type: 0 = sans opinion | 1 = like | -1 = dislike
 * @param  {code, message} res : réponse envoyée du back vers le front
 */
exports.giveOpinion = (req, res) => {
  const sql_query_verify = `SELECT COUNT(*) AS opinion_result FROM user_post_opinion WHERE user_id = ${req.body.user_id} AND post_id = ${req.body.post_id}; `;
  const sql_query_delete = `DELETE FROM user_post_opinion WHERE user_id = ${req.body.user_id} AND post_id = ${req.body.post_id};`;
  const sql_query_add = `INSERT INTO user_post_opinion (user_id, post_id, type) VALUES (${req.body.user_id}, ${req.body.post_id}, ${req.body.type});`;
  const db = db_connection.getDB();

  // Vérifier si une reaction est existante en bdd pour ce user sur ce post
  db.query(sql_query_verify, (err, result) => {
    if (err) {
      res.status(400).json({
        message: "Une erreur est survenue lors de la recherche de l'opinion."
      });
      //   throw err;
    }
    // si une reaction est existante en bdd pour ce user sur ce post (like ou dislike)
    if (result[0].opinion_result > 0) {
      // on supprime cette réaction
      db.query(sql_query_delete, (err, result) => {
        if (err) {
          res.status(400).json({
            message:
              'Une erreur est survenue lors de la suppression de la réaction.'
          });
          //   throw err;
        } else {
          // renvoie au front la confirmation du unlike ou undislike que si la requête était '0'
          if (req.body.type === 0) {
            res.status(200).json({
              message:
                'Votre réaction a été supprimée avec succès pour cette publication.'
            });
          }
        }
      });
    }
    // si 1 ou -1
    if (req.body.type === 1 || req.body.type === -1) {
      // const db = db_connection.getDB();
      // ajouter la réaction
      db.query(sql_query_add, (err, result) => {
        console.log('giveOpinion', result);
        if (!result) {
          res.status(400).json({
            message: "Une erreur est survenue lors de l'ajout de l'opinion."
          });
        } else {
          res
            .status(201)
            .json({ message: 'Votre opinion a été ajouté avec succès !' });
        }
      });
    }
  });
};
