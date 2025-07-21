// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();
require('dotenv').config();


// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const trukRoutes = require('./routes/trukRoutes');
const penimbanganRoutes = require('./routes/penimbanganRoutes');
const adminRoutes = require('./routes/adminRoutes');


// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/truk', trukRoutes);
app.use('/api/penimbangan', penimbanganRoutes);
app.use('/api/admin', adminRoutes);


// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Logistik PTB API is running ✅');
});

// TODO: Import routes (satpam, penimbang, admin logistik) here later
// Example:
// const trukRoutes = require('./routes/trukRoutes');
// app.use('/api/truk', trukRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
