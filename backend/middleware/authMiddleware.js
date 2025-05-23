const jwt = require("jsonwebtoken");
const db = require("../database");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token não fornecido." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido." });

    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [decoded.id], (err, results) => {
      if (err || results.length === 0) return res.status(404).json({ message: "Usuário não encontrado." });

      req.user = results[0];
      next();
    });
  });
};

const permitOnly = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    console.log(`❌ Acesso negado: role "${req.user.role}" - esperado: "${role}"`);
    return res.status(403).json({ message: "Acesso não autorizado." });
  }
  next();
};

module.exports = { verifyToken, permitOnly };
