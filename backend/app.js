const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

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

module.exports = app;
