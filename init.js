// script/initUsers.js
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_systemptb'
});

async function insertUsers() {
  const saltRounds = 10;
  const password = 'dummy';

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const users = [
    ['satpam', 'satpam@gmail.com', hashedPassword, '11111111-1111-1111-1111-111111111111'],
    ['penimbang', 'penimbang@gmail.com', hashedPassword, '22222222-2222-2222-2222-222222222222'],
    ['admin', 'admin@gmail.com', hashedPassword, '33333333-3333-3333-3333-333333333333'],
  ];

  users.forEach(([nama, email, pass, role]) => {
    connection.query(
      'INSERT INTO users (id, nama, email, password, role_id) VALUES (UUID(), ?, ?, ?, ?)',
      [nama, email, pass, role],
      (err) => {
        if (err) console.error(err);
        else console.log(`${nama} inserted`);
      }
    );
  });
}

insertUsers();
