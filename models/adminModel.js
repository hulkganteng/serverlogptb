const db = require('../config/db');

// Ambil semua data rekapan logistik (gabung truk + penimbangan)
exports.getRekapan = (callback) => {
  const sql = `
    SELECT 
      p.id_penimbangan,
      p.berat_awal,
      p.berat_akhir,
      p.massa_barang,
      p.relasi_type,
      p.relasi_nama,
      p.status_validasi,
      p.waktu_penimbangan,
      t.id AS id_truk,
      t.no_polisi,
      t.nama_sopir,
      t.jenis_barang,
      t.status_muatan,
      t.waktu_masuk,
      t.waktu_keluar
    FROM penimbangan p
    JOIN truk t ON p.id_truk = t.id
    ORDER BY p.waktu_penimbangan DESC
  `;
  db.query(sql, callback);
};

// Ambil detail rekapan berdasarkan ID penimbangan
exports.getRekapanById = (id, callback) => {
  const sql = `
    SELECT 
      p.id_penimbangan,
      p.berat_awal,
      p.berat_akhir,
      p.massa_barang,
      p.relasi_type,
      p.relasi_nama,
      p.status_validasi,
      p.waktu_penimbangan,
      t.id AS id_truk,
      t.no_polisi,
      t.nama_sopir,
      t.jenis_barang,
      t.status_muatan,
      t.waktu_masuk,
      t.waktu_keluar
    FROM penimbangan p
    JOIN truk t ON p.id_truk = t.id
    WHERE p.id_penimbangan = ?
  `;
  db.query(sql, [id], callback);
};

// Ambil data untuk surat jalan berdasarkan ID penimbangan
exports.getSuratJalanData = (id, callback) => {
  const sql = `
    SELECT 
      p.id_penimbangan,
      p.berat_awal,
      p.berat_akhir,
      p.massa_barang,
      p.relasi_type,
      p.relasi_nama,
      p.status_validasi,
      p.waktu_penimbangan,
      t.id AS id_truk,
      t.no_polisi,
      t.nama_sopir,
      t.jenis_barang,
      t.waktu_masuk,
      t.waktu_keluar
    FROM penimbangan p
    JOIN truk t ON p.id_truk = t.id
    WHERE p.id_penimbangan = ?
  `;
  db.query(sql, [id], callback);
};

// Ambil data mingguan berdasarkan tanggal minggu pertama
exports.getRekapanMingguan = (mingguAwal, callback) => {
  const sql = `
    SELECT 
      p.id_penimbangan,
      p.berat_awal,
      p.berat_akhir,
      p.massa_barang,
      p.status_validasi,
      p.relasi_type,
      p.relasi_nama,
      p.waktu_penimbangan,
      t.no_polisi,
      t.nama_sopir,
      t.jenis_barang,
      t.status_muatan,
      t.waktu_masuk,
      t.waktu_keluar
    FROM penimbangan p
    JOIN truk t ON p.id_truk = t.id
    WHERE p.waktu_penimbangan BETWEEN ? AND DATE_ADD(?, INTERVAL 6 DAY)
    ORDER BY p.waktu_penimbangan DESC
  `;
  db.query(sql, [mingguAwal, mingguAwal], callback);
};

// Update status rekapan (validasi): 'disetujui' atau 'ditolak'
exports.updateStatusRekapan = (id, status, callback) => {
  const sql = 'UPDATE penimbangan SET status_validasi = ? WHERE id_penimbangan = ?';
  db.query(sql, [status, id], callback);
};

// Update data penimbangan (edit)
exports.updateRekapan = (id, data, callback) => {
  const { berat_awal, berat_akhir, massa_barang, relasi_type, relasi_nama } = data;
  const sql = `
    UPDATE penimbangan
    SET berat_awal = ?, berat_akhir = ?, massa_barang = ?, relasi_type = ?, relasi_nama = ?
    WHERE id_penimbangan = ?
  `;
  db.query(sql, [berat_awal, berat_akhir, massa_barang, relasi_type, relasi_nama, id], callback);
};

// Hapus data penimbangan
exports.deleteRekapan = (id, callback) => {
  const sql = 'DELETE FROM penimbangan WHERE id_penimbangan = ?';
  db.query(sql, [id], callback);
};


