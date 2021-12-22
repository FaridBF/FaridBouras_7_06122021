const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// const path = require('path');

// Lancement du framework Express
const app = express();

// Permet de pallier à l'erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Ajout de headers à l'objet "response"
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  ); // les headers autorisés (en têtes)
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Transformation du corps de la requête en objet JSON utilisable
app.use(express.json()); // (remplace body parser)
app.use(
  express.urlencoded({
    extended: true
  })
);

// Rendre le dossier  des "images" complémentement statique
// app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrement des routes dans notre application
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;
