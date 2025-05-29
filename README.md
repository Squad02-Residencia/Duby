# Duby - Projeto de Cadastro Bancário

---

## 🧠 Requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- **Node.js** (v18+)
- **MySQL Server** (v8+)
- **Git**

---

## 1. Configuração do Banco de Dados MySQL

### 1.1 Crie o banco de dados e as tabelas

Acesse seu MySQL via terminal ou software (exemplo: MySQL Workbench).

No terminal, use:
mysql -u root -p (e depois coloque sua senha do banco de dados)

# No SQL execute:
CREATE DATABASE IF NOT EXISTS dubydb;
USE dubydb;

-- Tabela de usuários --
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role ENUM('admin', 'cliente') NOT NULL
);

-- Tabela de adquirentes (clientes) --
CREATE TABLE IF NOT EXISTS adquirentes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

# Inserção de usuários padrão
-- Usuário admin --
INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@duby.com', '1234', 'admin');

-- Usuário cliente e empresa vinculada --
INSERT INTO users (name, email, password, role) VALUES ('Cliente', 'cliente@duby.com', '1234', 'cliente');
INSERT INTO adquirentes (name, email, user_id) VALUES ('Empresa XYZ', 'cliente@duby.com', 2);

No arquivo backend/database.js, atualize as credenciais do MySQL para seu ambiente:
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'SEU_USUARIO',
  password: 'SUA_SENHA',
  database: 'dubydb'
});



# Instalação das dependências
cd backend
npm install

cd frontend 
npm install


# Executar o projeto
cd backend
node server.js

cd frontend 
npm run dev


# Dicas rápidas para MySQL via terminal

mysql -u root -p  # Entrar no MySQL

USE dubydb; # Selecionar banco

SHOW TABLES; # Mostrar tabelas

SELECT * FROM users; # Consultar dados na tabela users

DESCRIBE users; # Ver estrutura da tabela users


# Senha do banco
A senha do banco é pessoal e deve ser configurada conforme seu ambiente.





