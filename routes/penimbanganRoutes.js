const express = require('express');
const router = express.Router();
const penimbanganController = require('../controllers/penimbanganController');
const { verifyToken } = require('../controllers/authController');

router.get('/pending', verifyToken, penimbanganController.getTrukPending);
router.post('/', verifyToken, penimbanganController.simpanPenimbangan);
router.get('/hari-ini', verifyToken, penimbanganController.getPenimbanganHariIni);
// penimbanganRoutes.js
router.post('/validasi', verifyToken, penimbanganController.validasiPenimbangan);




module.exports = router;
