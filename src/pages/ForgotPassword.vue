<template>
  <div class="forgot-password-page">
    <img src="@/assets/imagens/cima.png" alt="Forma Roxa Topo" class="bg-top-left" />
    <img src="@/assets/imagens/baixo.png" alt="Forma Roxa Fundo" class="bg-bottom-right" />

    <div class="forgot-password-container">
      <div class="logo">
        <img src="@/assets/imagens/logo.png" alt="Logo Duby" class="logo-img" />
      </div>

      <div v-if="!step2" class="forgot-password-form">
        <h2>Recuperação de Senha</h2>
        <input type="email" placeholder="Email" v-model="email" class="input-field" />
        <button @click="handleSendEmail" class="btn-send">Enviar</button>
      </div>

      <div v-if="step2" class="reset-password-form">
        <h2>Redefinir Senha</h2>
        <input type="password" placeholder="Nova Senha" v-model="newPassword" class="input-field" />
        <input type="password" placeholder="Repetir Nova Senha" v-model="confirmPassword" class="input-field" />
        <button @click="handleResetPassword" class="btn-reset">Redefinir</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      newPassword: "",
      confirmPassword: "",
      step2: false, // Controla se está na etapa de redefinição de senha
    };
  },
  methods: {
    handleSendEmail() {
      if (this.email) {
        // Aqui pode simular um envio de email (em produção, você faria isso via backend)
        console.log(`Email enviado para: ${this.email}`);
        this.step2 = true; // Avança para a etapa de redefinir senha
      } else {
        console.log("Por favor, informe um email válido.");
      }
    },
    handleResetPassword() {
      if (this.newPassword && this.confirmPassword) {
        if (this.newPassword === this.confirmPassword) {
          console.log("Senha redefinida com sucesso!");
          this.$router.push("/"); // Volta para a página de login após redefinir a senha
        } else {
          console.log("As senhas não coincidem.");
        }
      } else {
        console.log("Por favor, preencha todos os campos.");
      }
    },
  },
};
</script>

<style scoped>
/* ===== Estilos ===== */
.forgot-password-page {
  font-family: 'Poppins', sans-serif;
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
h2 {
  color:#4F29AA;
}
/* detalhes cantos */
.bg-top-left,
.bg-bottom-right {
  position: fixed;
  width: 300px;
  max-width: 30%;
  z-index: 0;
  pointer-events: none;
}

.bg-top-left {
  top: 0;
  left: 0;
}

.bg-bottom-right {
  bottom: 0;
  right: 0;
}

/* Container do formulário */
.forgot-password-container {
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

.forgot-password-form,
.reset-password-form {
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
}

.btn-send,
.btn-reset {
  background-color: #2e2760;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-send:hover,
.btn-reset:hover {
  background-color: #4a3d8d;
}
</style>
