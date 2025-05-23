const db = require("../database");

exports.criarCliente = (req, res) => {
  const { nome, email, senha } = req.body;

  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'cliente')`;

  db.query(query, [nome, email, senha], (err, results) => {
    if (err) return res.status(500).json({ message: "Erro ao criar cliente", error: err });

    res.status(201).json({ message: "Cliente criado com sucesso" });
  });
};
