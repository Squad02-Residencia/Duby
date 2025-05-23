const express = require('express');
const router = express.Router();
const db = require('./database');

// Rota de login (sem bcrypt)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro no servidor' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];

    if (user.password === password) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        role: user.role
      });
    } else {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
  });
});

module.exports = router;
