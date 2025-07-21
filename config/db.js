const mysql = require('mysql2'); // ← WAJIB ditambahkan
require('dotenv').config(); // Jika dibutuhkan di sini juga

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

module.exports = connection;
