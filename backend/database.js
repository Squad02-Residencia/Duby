const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // seu nome do MySQL
  password: 'Gatao-04', // sua senha do MySQL
  database: 'dubydb'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado ao MySQL!');
});

module.exports = connection;
