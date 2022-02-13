const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const helmet = require('helmet');
const nocache = require('nocache');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');

/** Le module de chemin de noeud
 * Le path module fournit de nombreuses fonctionnalités très utiles pour accéder et interagir avec le système de fichiers.
   Il n'est pas nécessaire de l'installer. Faisant partie du noyau Node, il peut être utilisé en l'exigeant: 'const path = require('path')'
 */
const path = require('path');

/** Sécurité : contre les injections de commande, scripts intersites XSS.
 * La "sanitizeMiddleware fonction" nettoie et échappe à la requête, aux paramètres et au corps des requêtes pour se protéger contre les scripts intersites (XSS)
 * C'est également contre les attaques par injection de commande (la config objet est facultatif)
 * Le middleware acceptera toutes les propriétés trouvées dans les propriétés body, query, et paramsobject de a req.
 */
const expressSanitizer = require('express-sanitizer');

// Lancement du framework Express
const app = express();

// Permet de pallier à l'erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
  // Ajout de headers à l'objet "response"
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  ); // les headers autorisés (en têtes)
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// trouvé sur discord erreur cors (peut-être pr la prérequest)
app.options('/*', (_, res) => {
  res.sendStatus(200);
});

// Sécuriser Express en définissant divers en-têtes HTTP
app.use(helmet());

// Lire cookie
app.use(cookieParser());

// Sécurisation des cookies afin d'accroître la sécurité
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 heure
app.use(
  session({
    cookie: {
      domain: `http://localhost:${process.env.port || '3000'}`,
      expires: expiryDate,
      httpOnly: true,
      path: '/',
      secure: true
    },
    name: process.env.SECRET_NAME,
    secret: process.env.SECRET_SESSION
  })
);

// Sanitize Middleware (contre les injections)
app.use(expressSanitizer());

// Pour désactiver la mise en cache du navigateur
app.use(nocache());

// Transformation du corps de la requête en objet JSON utilisable
app.use(express.json()); // (remplace body parser)
app.use(
  express.urlencoded({
    extended: true
  })
);

// Donner accès au dossier static : "images"
app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrement des routes dans notre application
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;
