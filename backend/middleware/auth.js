// middleware d'auth pour vérifier le token envoyé par l'applicat° frontend
const jwt = require('jsonwebtoken');
const db_connection = require('../config/database');

const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  // récupération du cookie avec nom 'jwt'
  const token = req.cookies.jwt;
  try {
    if (token) {
      // (clé secrète en argument identique à la fonction login)
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      // récupération du userId depuis cookie
      const userId = decodedToken.userId;
      // vérif du userId dans le corps de la requête différent du userId du token
      // connexion à la BDD
      const db = db_connection.getDB();
      const sql_query = `SELECT id FROM user WHERE id = ${userId};`;
      db.query(sql_query, (err, result) => {
        // si aucun user trouvé
        if (!result) {
          res.status(400).json({ message: 'Une erreur est survenue.' });
          // throw 'Utilisateur invalide';
        } else if (result.length === 0) {
          res.status(400).json({ message: 'Utilisateur invalide !' });
          // throw 'Utilisateur invalide';
        } else {
          // permettre l'accès à la route
          next();
        }
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: 'Non autorisé' });
    }
  } catch {
    res.status(401).json({
      error: 'Non autorisé'
    });
  }
};
