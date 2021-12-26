// middleware d'auth pour vérifier le token envoyé par l'applicat° frontend
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  try {
    // récupération du deuxième élément de ce tableau  via split
    const token = req.headers.authorization.split(' ')[1];
    // (clé secrète en argument identique à la fonction login)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // récupération du user ID encoder dans l'objet JS
    const userId = decodedToken.userId;
    // vérif du userID dans le corps de la requête différent du userID du token
    if (req.body.userId && req.body.userId !== userId) {
      // on ne souhaite pas authentifier la requête
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
