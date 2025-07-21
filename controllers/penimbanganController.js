const db = require('../config/db');
const penimbanganModel = require('../models/penimbanganModel');

// ✅ Ambil truk yang belum ditimbang
exports.getTrukPending = (req, res) => {
  penimbanganModel.getTrukPending((err, result) => {
    if (err) {
      console.error('❌ Gagal ambil truk pending:', err);
      return res.status(500).json({ message: 'Gagal mengambil data truk pending' });
    }
    res.json(result);
  });
};


// ✅ Simpan hasil penimbangan
exports.simpanPenimbangan = (req, res) => {
  const {
    id_truk,
    berat_awal,
    berat_akhir,
    waktu_penimbangan,
    massa_barang
  } = req.body;

  // Validasi dasar
  if (
  !id_truk ||
  berat_awal === undefined || berat_akhir === undefined ||
  massa_barang === undefined || !waktu_penimbangan
) {
  return res.status(400).json({ message: 'Semua field wajib diisi.' });
}


  // Ambil data relasi dari tabel truk
  const getRelasiSql = `SELECT relasi_nama, relasi_type FROM truk WHERE id = ? LIMIT 1`;
  db.query(getRelasiSql, [id_truk], (err, results) => {
    if (err) {
      console.error('❌ Gagal ambil data truk:', err);
      return res.status(500).json({ message: 'Gagal mengambil data truk', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Truk tidak ditemukan.' });
    }

    const { relasi_nama, relasi_type } = results[0];

    const data = {
      id_truk,
      berat_awal,
      berat_akhir,
      massa_barang,
      relasi_type,
      relasi_nama,
      waktu_penimbangan
    };

    // Insert ke tabel penimbangan
    penimbanganModel.insertPenimbangan(data, (err) => {
      if (err) {
        console.error('❌ Gagal simpan penimbangan:', err);
        return res.status(500).json({ message: 'Gagal simpan penimbangan', error: err });
      }

      // Update status proses truk jadi 'siap_keluar'
      penimbanganModel.setTrukSiapKeluar(id_truk, (err2) => {
        if (err2) {
          console.error('⚠️ Penimbangan tersimpan tapi gagal update status truk:', err2);
          return res.status(500).json({ message: 'Tersimpan, tapi gagal update status truk' });
        }

        res.status(201).json({ message: 'Penimbangan berhasil disimpan' });
      });
    });
  });
};

// ✅ Ambil riwayat penimbangan hari ini
exports.getPenimbanganHariIni = (req, res) => {
  penimbanganModel.getPenimbanganHariIni((err, result) => {
    if (err) {
      console.error('❌ Gagal ambil riwayat penimbangan:', err);
      return res.status(500).json({ message: 'Gagal mengambil riwayat penimbangan' });
    }
    res.json(result);
  });
};

// ✅ Validasi status penimbangan (misal disetujui / ditolak oleh admin)
exports.validasiPenimbangan = (req, res) => {
  const { id, status } = req.body;

  if (!id || !['disetujui', 'ditolak'].includes(status)) {
    return res.status(400).json({ message: 'Permintaan validasi tidak sah.' });
  }

  penimbanganModel.updateStatusValidasi(id, status, (err) => {
    if (err) {
      console.error('❌ Gagal update status validasi:', err);
      return res.status(500).json({ message: 'Gagal update status validasi' });
    }

    res.json({ message: 'Status validasi berhasil diperbarui' });
  });
};

exports.validasiPenimbanganManual = (id, status, res) => {
  if (!id || !['disetujui', 'ditolak'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid' });
  }

  penimbanganModel.updateStatusValidasi(id, status, (err) => {
    if (err) {
      console.error(`❌ Gagal update validasi manual (${status}):`, err);
      return res.status(500).json({ message: 'Gagal update status validasi' });
    }

    res.status(200).json({ message: `Status validasi berhasil diubah menjadi ${status}` });
  });
};

