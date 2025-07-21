// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../controllers/authController');

// Endpoint Admin Logistik
router.get('/rekapan', verifyToken, adminController.getRekapan);
router.get('/rekapan/:id', verifyToken, adminController.getRekapanById);
router.get('/surat-jalan/:id', verifyToken, adminController.getSuratJalan);
router.get('/laporan', verifyToken, adminController.getLaporanMingguan);
router.patch('/rekapan/:id/accept', verifyToken, adminController.acceptRekapan);
router.patch('/rekapan/:id/reject', verifyToken, adminController.rejectRekapan);
router.patch('/rekapan/:id', verifyToken, adminController.updateRekapan);
router.delete('/rekapan/:id', verifyToken, adminController.deleteRekapan);




module.exports = router;
