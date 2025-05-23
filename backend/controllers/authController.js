const jwt = require('jsonwebtoken');
const db = require("../database");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido', token, role: user.role });
  });
};

exports.registerAdmin = (req, res) => {
  const { nome, email, senha } = req.body;

  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')`;

  db.query(query, [nome, email, senha], (err, results) => {
    if (err) return res.status(500).json({ message: "Erro ao criar admin", error: err });

    res.status(201).json({ message: "Admin criado com sucesso" });
  });
};
