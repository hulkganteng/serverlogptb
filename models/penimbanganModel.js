const db = require('../config/db');

// Ambil truk yang belum ditimbang (status_proses ditambahkan)
exports.getTrukPending = (callback) => {
  const sql = `
    SELECT 
      t.id, 
      t.no_polisi, 
      t.nama_sopir, 
      t.jenis_barang, 
      COALESCE(t.relasi_type, '') AS relasi_type,
      COALESCE(t.relasi_nama, '') AS relasi_nama,
      t.status_muatan, 
      t.status_proses,
      t.waktu_masuk
    FROM truk t
    LEFT JOIN penimbangan p ON t.id = p.id_truk
    WHERE p.id_truk IS NULL AND t.status_muatan = 'masuk'
  `;
  db.query(sql, callback);
};

// Simpan penimbangan
exports.insertPenimbangan = (data, callback) => {
  const sql = `INSERT INTO penimbangan SET ?`;
  db.query(sql, [data], callback);
};

// Update truk setelah penimbangan: status_proses = 'siap_keluar'
exports.setTrukSiapKeluar = (id_truk, callback) => {
  const sql = `UPDATE truk SET status_proses = 'siap_keluar' WHERE id = ?`;
  db.query(sql, [id_truk], callback);
};

// Ambil riwayat penimbangan hari ini
exports.getPenimbanganHariIni = (callback) => {
  const sql = `
    SELECT 
      p.*, 
      t.no_polisi, 
      t.nama_sopir, 
      t.jenis_barang
    FROM penimbangan p
    JOIN truk t ON p.id_truk = t.id
    WHERE DATE(p.waktu_penimbangan) = CURDATE()
    ORDER BY p.waktu_penimbangan DESC
  `;
  db.query(sql, callback);
};

exports.updateStatusValidasi = (id_penimbangan, status, callback) => {
  const sql = `UPDATE penimbangan SET status_validasi = ? WHERE id = ?`;
  db.query(sql, [status, id_penimbangan], callback);
};




