<template>
  <div class="login-page">
    <img src="@/assets/imagens/cima.png" alt="Forma Roxa Topo" class="bg-top-left" />
    <img src="@/assets/imagens/baixo.png" alt="Forma Roxa Fundo" class="bg-bottom-right" />

    <div class="login-container">
      <div class="logo">
        <img src="@/assets/imagens/logo.png" alt="Logo Duby" class="logo-img" />
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <input type="email" placeholder="Email" v-model="email" class="input-field" />
        <div class="password-container">
          <input :type="passwordVisible ? 'text' : 'password'" placeholder="Senha" v-model="password" class="input-field" />
          <span class="toggle-password" @click="togglePassword">
            <i :class="passwordVisible ? 'bx bx-hide' : 'bx bx-show'"></i>
          </span>
        </div>

        <div class="options">
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="rememberMe" />
            <span class="custom-checkbox"></span>
            Lembrar senha
          </label>
          <a href="#" @click.prevent="goToForgotPassword">Esqueci minha senha</a>
        </div>

        <button type="submit" class="btn-login">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      passwordVisible: false,
    };
  },
  methods: {
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    handleLogin() {
      if (this.email && this.password) {
        fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
          .then(res => res.json())
          .then(data => {
            if (data && data.role) {
              localStorage.setItem('tipoUsuario', data.role);

              if (data.role === 'admin') {
                this.$router.push('/clientes');
              } else if (data.role === 'cliente') {
                this.$router.push('/dashboard');
              } else {
                alert('Usuário sem permissão válida');
              }
            } else {
              alert('Usuário ou senha inválidos');
            }
          })
          .catch(() => alert('Erro ao conectar ao servidor'));
      } else {
        alert('Preencha todos os campos');
      }
    },
    goToForgotPassword() {
      this.$router.push('/forgot-password');
    }
  },
};
</script>

<style scoped>
/* ===== Estilo ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  font-family: 'Poppins', sans-serif;
  background-color: #f5f5f5;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* detalhes cantos */
.bg-top-left,
.bg-bottom-right {
  position: fixed;
  width: 300px;
  max-width: 30%;
  z-index: 0;
  pointer-events: none; /* deixa clicável o formulário mesmo que sobreponha */
}

.bg-top-left {
  top: 0;
  left: 0;
}

.bg-bottom-right {
  bottom: 0;
  right: 0;
}

/* Card do Login */
.login-container {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-bottom: 20px;
}

.logo-img {
  width: 400px;
  max-width: 80%;
}

/* Formulário */
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #2e2760;
  color: #ffffff;
  font-size: 16px;
  width: 100%;
  padding-right: 40px;
}

.input-field::placeholder {
  color: #cccccc;
}

/*senha e botão de ver/ocultar */
.password-container {
  position: relative;
  width: 100%;
}

.input-field {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #2e2760;
  color: #ffffff;
  font-size: 16px;
  width: 100%;
  padding-right: 45px; /* MAIS espaço no lado direito para o ícone */
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px; /* Tamanho melhor para o ícone */
  color: #cccccc;
  z-index: 2; /* Garante que o ícone fique acima */
}

.bx-show,
.bx-hide {
  font-size: 22px;
}


.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.options a {
  color: #2e2760;
  text-decoration: none;
}

.options a:hover {
  text-decoration: underline;
}

/* Botão */
.btn-login {
  background-color: #2e2760;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #4a3d8d;
}

/* Responsividade básica*/
@media (max-width: 600px) {
  .login-container {
    max-width: 90%;
    padding: 30px 20px;
  }

  .bg-top-left,
  .bg-bottom-right {
    width: 200px;
  }
}

/* Checkbox com ícone de check */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-wrapper input[type="checkbox"] {
  display: none; /* escondemos o checkbox padrão */
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border: 2px solid #2e2760;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox {
  background-color: #2e2760;
  border-color: #2e2760;
}

.checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox::after {
  content: '✓';
  color: white;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
}
</style>
