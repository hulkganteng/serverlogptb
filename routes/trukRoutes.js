const express = require('express');
const router = express.Router();
const trukController = require('../controllers/trukController');
const { verifyToken } = require('../controllers/authController');

// SATPAM
router.post('/', verifyToken, trukController.inputTrukMasuk);
router.patch('/:id/keluar', verifyToken, trukController.inputWaktuKeluar);
router.get('/hari-ini', verifyToken, trukController.getTrukHariIni);
router.get('/riwayat', verifyToken, trukController.getRiwayatTrukMasuk);

module.exports = router;
