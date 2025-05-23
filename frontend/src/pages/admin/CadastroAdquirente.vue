<template>
  <div class="dashboard">
    <SidebarAdmin />
    <div class="content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <h1>Cadastro de Adquirente</h1>
      <div class="ident-adq">
        <p>Identificação de Adquirente</p>
        <hr>
        <label for="adquirente">Nome da Adquirente</label>
        <select required>
          <option value="" disabled selected hidden>Selecione uma adquirente</option>
          <option value="cielo">Cielo</option>
          <option value="pagseguro">PagSeguro</option>
          <option value="sicredi">Sicredi</option>
          <option value="stone">Stone</option>
          <option value="valorem">ValoremPay</option>
        </select>
        <label for="chave">Chave da API</label>
        <input type="text" name="chave-api" id="chave">
        <label for="taxa">Valor da Taxa (%)</label>
        <input type="text" name="valor-taxa" id="taxa">
        <div class="enviar">
          <input type="submit" value="Enviar" @click="enviarAdquirente">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/SidebarAdmin.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const isSidebarCollapsed = ref(false);

function handleSidebarToggle(event) {
  isSidebarCollapsed.value = event.detail.isCollapsed;
}

function enviarAdquirente() {
  alert('Adquirente registrada!');
}

onMounted(() => {
  window.addEventListener('sidebar-toggle', handleSidebarToggle);
  const sidebarElement = document.querySelector('.sidebar');
  if (sidebarElement && sidebarElement.classList.contains('sidebar-collapsed')) {
    isSidebarCollapsed.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('sidebar-toggle', handleSidebarToggle);
});
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 2rem;
  transition: width 0.3s ease;
  width: calc(100% - 250px);
}

.content-expanded {
  width: calc(100% - 80px);
}

.ident-adq {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.2);
  padding: 2rem;
  margin-top: 2rem;
}

p {
  font-size: 20px;
  padding-bottom: 10px;
}

label {
  margin-top: 15px;
  font-size: 1.2em;
}

select, input[type="text"] {
  width: 250px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 5px;
  font-size: 1em;
  margin-bottom: 10px;
  padding-left: 5px;
}

#taxa {
  width: 100px;
}

.enviar {
  display: flex;
  justify-content: flex-end;
}

input[type="submit"] {
  width: 120px;
  height: 40px;
  background-color: #73ba60;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

input[type="submit"]:hover {
  background-color: #45aa2a;
}
</style>