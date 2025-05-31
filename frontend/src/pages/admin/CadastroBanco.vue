<template>
  <div class="layout">
    <SidebarAdmin />
    <div class="content">
      <h1>Cadastro de Banco</h1>

      <div v-if="mensagemVisivel" class="mensagem-topo">
        Formulário enviado com sucesso!
      </div>

      <h2>Dados da Conta Financeira</h2>

      <form @submit.prevent="enviarFormulario">
        <div class="form-group">
          <label for="instituicao">Instituição Bancária</label>
          <select id="instituicao" v-model="formulario.instituicao">
            <option value="">Selecione</option>
            <option value="001">Banco do Brasil</option>
            <option value="237">Bradesco</option>
            <option value="341">Itaú</option>
            <option value="104">Caixa Econômica Federal</option>
            <option value="033">Santander</option>
            <option value="260">Nubank</option>
            <option value="077">Banco Inter</option>
            <option value="212">Banco Original</option>
          </select>
        </div>

        <div class="form-group">
          <label for="razao">Razão Social</label>
          <input type="text" id="razao" v-model="formulario.razao" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="agencia">Agência</label>
            <input type="text" id="agencia" v-model="formulario.agencia" />
          </div>
          <div class="form-group">
            <label for="conta">Número da Conta</label>
            <input type="text" id="conta" v-model="formulario.conta" />
          </div>
        </div>

        <div class="form-group">
          <label for="cnpj">CNPJ</label>
          <input type="text" id="cnpj" v-model="formulario.cnpj" />
        </div>

        <div class="form-group">
          <label for="tipo">Tipo de Conta</label>
          <select id="tipo" v-model="formulario.tipo">
            <option value="">Selecione</option>
            <option value="corrente">Conta Corrente</option>
            <option value="poupanca">Conta Poupança</option>
            <option value="salario">Conta Salário</option>
            <option value="pagamento">Conta de Pagamento</option>
            <option value="conjunta">Conta Conjunta</option>
          </select>
        </div>

        <div class="form-group">
          <label>Comprovante de conta bancária</label>
          <label for="comprovante" class="file-button">Adicionar um arquivo</label>
          <input type="file" id="comprovante" @change="handleArquivo" style="display: none;" />
          <div class="arquivo-adicionado">{{ arquivoNome }}</div>
        </div>

        <button type="submit" class="submit-button">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref } from 'vue'

const mensagemVisivel = ref(false)
const arquivoNome = ref('')

const formulario = ref({
  instituicao: '',
  razao: '',
  agencia: '',
  conta: '',
  cnpj: '',
  tipo: '',
})

function handleArquivo(event) {
  const file = event.target.files[0]
  arquivoNome.value = file ? `Arquivo '${file.name}' adicionado com sucesso.` : ''
}

function enviarFormulario() {
  formulario.value = {
    instituicao: '',
    razao: '',
    agencia: '',
    conta: '',
    cnpj: '',
    tipo: '',
  }
  arquivoNome.value = ''
  document.getElementById('comprovante').value = ''
  mensagemVisivel.value = true
  setTimeout(() => (mensagemVisivel.value = false), 3000)
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

.content {
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
}

form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 24px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 18px;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1;
}

input,
select {
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

label {
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
}

.file-button {
  background-color: #5e3b91;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  width: fit-content;
  margin-top: 0.5rem;
}

.file-button:hover {
  background-color: #4b2f75;
}

.submit-button {
  background-color: #65c060;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 1.5rem;
}

.submit-button:hover {
  background-color: #51a34e;
}

.arquivo-adicionado {
  margin-top: 8px;
  font-size: 13px;
  color: #555;
}

.mensagem-topo {
  background-color: #d4edda;
  color: #155724;
  padding: 12px 16px;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-bottom: 16px;
}

/* Responsivo: Sidebar em cima no mobile */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .content {
    padding: 1rem;
  }

  form {
    padding: 1.5rem;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>
