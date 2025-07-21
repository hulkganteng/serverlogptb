const trukModel = require('../models/trukModel');

// Input Truk Masuk
exports.inputTrukMasuk = (req, res) => {
  const { no_polisi, nama_sopir, jenis_barang, relasi_nama, relasi_type, waktu_masuk } = req.body;
  const satpam_id = req.user?.id; // dari token

  if (!no_polisi || !nama_sopir || !jenis_barang || !relasi_nama || !relasi_type || !waktu_masuk) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  const data = {
    no_polisi,
    nama_sopir,
    jenis_barang,
    relasi_nama,
    relasi_type,
    waktu_masuk,
    status_muatan: 'masuk',
    satpam_id,
  };

  trukModel.inputTrukMasuk(data, (err, result) => {
    if (err) {
      console.error('❌ Gagal input truk masuk:', err);
      return res.status(500).json({ message: 'Gagal input truk masuk' });
    }
    res.status(201).json({ message: 'Truk berhasil dicatat', id: result.insertId });
  });
};

// Waktu Keluar

exports.inputWaktuKeluar = (req, res) => {
  const { id } = req.params;
  const waktu_keluar = new Date();

  trukModel.inputWaktuKeluar(id, waktu_keluar, (err) => {
    if (err) {
      console.error('❌ Gagal update waktu keluar:', err);
      return res.status(500).json({ message: 'Gagal update truk keluar' });
    }
    res.status(200).json({ message: 'Waktu keluar berhasil dicatat' });
  });
};


// Truk Hari Ini (untuk Form Keluar)
exports.getTrukHariIni = (req, res) => {
  trukModel.getTrukHariIni((err, results) => {
    if (err) {
      console.error('❌ Gagal ambil data hari ini:', err);
      return res.status(500).json({ message: 'Gagal ambil truk hari ini' });
    }
    res.status(200).json(results);
  });
};

// Riwayat Truk Masuk
exports.getRiwayatTrukMasuk = (req, res) => {
  trukModel.getRiwayatTrukMasuk((err, results) => {
    if (err) {
      console.error('❌ Gagal ambil riwayat:', err);
      return res.status(500).json({ message: 'Gagal ambil riwayat' });
    }
    res.status(200).json(results);
  });
};
