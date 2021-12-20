require('dotenv').config();

/**
 * Connexion à la base de données
 */
const mysql = require('mysql');
const db_connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

module.exports.getDB = () => {
  return db_connection;
};
