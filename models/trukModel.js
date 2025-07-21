const db = require('../config/db');

// Input Truk Masuk
exports.inputTrukMasuk = (data, callback) => {
  const sql = `
    INSERT INTO truk (
      id, no_polisi, nama_sopir, jenis_barang,
      relasi_nama, relasi_type, status_muatan,
      waktu_masuk, status_proses, satpam_id
    )
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, 'pending_penimbangan', ?)
  `;
  const values = [
    data.no_polisi,
    data.nama_sopir,
    data.jenis_barang,
    data.relasi_nama,
    data.relasi_type,
    data.status_muatan,
    data.waktu_masuk,
    data.satpam_id,
  ];
  db.query(sql, values, callback);
};

// Input Waktu Keluar
exports.inputWaktuKeluar = (id, waktu_keluar, callback) => {
  const sql = `
    UPDATE truk
    SET waktu_keluar = ?, status_muatan = 'keluar', status_proses = 'selesai'
    WHERE id = ?
  `;
  db.query(sql, [waktu_keluar, id], callback);
};


// Truk Hari Ini
exports.getTrukHariIni = (callback) => {
  const sql = `
    SELECT id, no_polisi, status_muatan, status_proses
    FROM truk
    WHERE DATE(waktu_masuk) = CURDATE()
    ORDER BY waktu_masuk DESC
  `;
  db.query(sql, callback);
};

// Riwayat Truk Masuk (all records)
exports.getRiwayatTrukMasuk = (callback) => {
  const sql = `
    SELECT no_polisi, nama_sopir, jenis_barang,
           relasi_nama, relasi_type, waktu_masuk,
           waktu_keluar, status_muatan, status_proses
    FROM truk
    ORDER BY waktu_masuk DESC
  `;
  db.query(sql, callback);
};

exports.getTrukKeluarHariIni = (callback) => {
  const sql = `
    SELECT id, no_polisi, nama_sopir, jenis_barang, waktu_keluar
    FROM truk
    WHERE DATE(waktu_keluar) = CURDATE()
    ORDER BY waktu_keluar DESC
  `;
  db.query(sql, callback);
};
