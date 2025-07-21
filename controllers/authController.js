// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ============================
// REGISTER USER
// ============================
exports.register = (req, res) => {
  const { nama, email, password, role_id } = req.body;

  if (!nama || !email || !password || !role_id) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  // Cek apakah nama sudah terdaftar
  db.query('SELECT * FROM users WHERE nama = ?', [nama], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    if (results.length > 0) return res.status(409).json({ message: 'Nama sudah terdaftar.' });

    // Hash password dan insert
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
      'INSERT INTO users (id, nama, email, password, role_id) VALUES (UUID(), ?, ?, ?, ?)',
      [nama, email, hashedPassword, role_id],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal registrasi', err });
        res.status(201).json({ message: 'Registrasi berhasil.' });
      }
    );
  });
};

/// ============================
// LOGIN USER
// ============================
exports.login = (req, res) => {
  const { nama, password } = req.body;

  const query = `
    SELECT users.*, roles.nama_role AS role
    FROM users 
    JOIN roles ON users.role_id = roles.id 
    WHERE users.nama = ?
  `;

  db.query(query, [nama], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    if (results.length === 0) return res.status(401).json({ message: 'Nama tidak ditemukan.' });

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Password salah.' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login berhasil.',
      token,
      role: user.role,
      nama: user.nama
    });
  });
};

// ============================
// VERIFY TOKEN
// ============================
exports.verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(403).json({ message: 'Token tidak ditemukan.' });

  const token = bearer.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token tidak valid.' });
    req.user = decoded;
    next();
  });
};
