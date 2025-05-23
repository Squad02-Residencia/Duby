const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, permitOnly } = require("../middleware/authMiddleware");

// Apenas admins podem criar novos clientes
router.post("/criar-cliente", verifyToken, permitOnly("admin"), userController.criarCliente);

module.exports = router;
