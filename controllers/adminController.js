const db = require('../config/db'); // Tambahkan ini agar bisa pakai db.query di bawah
const adminModel = require('../models/adminModel');

// GET /api/admin/rekapan
exports.getRekapan = (req, res) => {
  adminModel.getRekapan((err, results) => {
    if (err) {
      console.error('❌ Error ambil data rekapan:', err);
      return res.status(500).json({ message: 'Gagal ambil data rekapan', error: err });
    }
    res.status(200).json(results);
  });
};

// GET /api/admin/rekapan/:id
exports.getRekapanById = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

  adminModel.getRekapanById(id, (err, result) => {
    if (err) {
      console.error(`❌ Error ambil rekapan ID ${id}:`, err);
      return res.status(500).json({ message: 'Gagal ambil data detail rekapan', error: err });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json(result[0]);
  });
};

// GET /api/admin/surat-jalan/:id
exports.getSuratJalan = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

  adminModel.getSuratJalanData(id, (err, result) => {
    if (err) {
      console.error(`❌ Error ambil surat jalan ID ${id}:`, err);
      return res.status(500).json({ message: 'Gagal ambil data surat jalan', error: err });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    const data = result[0];

    // ✅ Tambahan logika: jika waktu_keluar belum tercatat, isi sekarang
    if (!data.waktu_keluar) {
      const now = new Date();
      const updateSql = `UPDATE truk SET waktu_keluar = ? WHERE id = ?`;

      db.query(updateSql, [now, data.id_truk], (updateErr) => {
        if (updateErr) {
          console.error(`❌ Gagal update waktu_keluar untuk truk ${data.id_truk}:`, updateErr);
          return res.status(500).json({ message: 'Gagal update waktu keluar' });
        }

        // Update waktu_keluar di object lokal untuk dikirim ke frontend
        data.waktu_keluar = now;
        return res.status(200).json(data);
      });
    } else {
      res.status(200).json(data);
    }
  });
};

// GET /api/admin/laporan?minggu=YYYY-MM-DD
exports.getLaporanMingguan = (req, res) => {
  const { minggu } = req.query;
  if (!minggu) return res.status(400).json({ message: 'Parameter minggu wajib diisi.' });

  adminModel.getRekapanMingguan(minggu, (err, results) => {
    if (err) {
      console.error(`❌ Error ambil laporan mingguan (${minggu}):`, err);
      return res.status(500).json({ message: 'Gagal ambil laporan mingguan', error: err });
    }
    res.status(200).json(results);
  });
};

// PATCH /api/admin/rekapan/:id/accept
exports.acceptRekapan = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

  const sql = `UPDATE penimbangan SET status_validasi = 'disetujui' WHERE id_penimbangan = ?`;
  db.query(sql, [id], (err) => {
    if (err) {
      console.error(`❌ Gagal update status_validasi ke 'disetujui' untuk ID ${id}:`, err);
      return res.status(500).json({ message: 'Gagal meng-ACC rekapan' });
    }
    res.status(200).json({ message: 'Rekapan berhasil diterima' });
  });
};

// PATCH /api/admin/rekapan/:id/reject
exports.rejectRekapan = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

  const sql = `UPDATE penimbangan SET status_validasi = 'ditolak' WHERE id_penimbangan = ?`;
  db.query(sql, [id], (err) => {
    if (err) {
      console.error(`❌ Gagal update status_validasi ke 'ditolak' untuk ID ${id}:`, err);
      return res.status(500).json({ message: 'Gagal menolak rekapan' });
    }
    res.status(200).json({ message: 'Rekapan berhasil ditolak' });
  });
};

// PATCH /api/admin/rekapan/:id
exports.updateRekapan = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

  adminModel.updateRekapan(id, updateData, (err) => {
    if (err) {
      console.error(`❌ Gagal update rekapan ID ${id}:`, err);
      return res.status(500).json({ message: 'Gagal update rekapan' });
    }
    res.status(200).json({ message: 'Rekapan berhasil diupdate' });
  });
};

// DELETE /api/admin/rekapan/:id
exports.deleteRekapan = (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

  adminModel.deleteRekapan(id, (err) => {
    if (err) {
      console.error(`❌ Gagal hapus rekapan ID ${id}:`, err);
      return res.status(500).json({ message: 'Gagal hapus rekapan' });
    }
    res.status(200).json({ message: 'Rekapan berhasil dihapus' });
  });
};

// Hapus data penimbangan
exports.hapusPenimbangan = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID tidak ditemukan' });
  }

  penimbanganModel.deletePenimbangan(id, (err) => {
    if (err) {
      console.error('❌ Gagal hapus penimbangan:', err);
      return res.status(500).json({ message: 'Gagal menghapus data' });
    }

    res.json({ message: 'Data berhasil dihapus' });
  });
};


