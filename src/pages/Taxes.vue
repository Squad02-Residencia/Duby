<template>
  <div class="layout">
    <Sidebar />
    <div class="content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <h2>Gerir Taxas</h2>
      <div class="border-container">
        <!-- Cards de resumo -->
        <div class="container">
          <div class="t">
            <p><strong>Total Arrecadado:</strong></p>
            <h1>R$999</h1>
          </div>
          <div class="t">
            <p><strong>Total Pendentes:</strong></p>
            <h1>R$999</h1>
          </div>
          <div class="t">
            <p><strong>Taxas Reembolso:</strong></p>
            <h1>R$999</h1>
          </div>
          <div class="t">
            <p><strong>Número de Taxas:</strong></p>
            <h1>20</h1>
          </div>
        </div>

        <div class="tx">Taxas:</div>

        <!-- Tabela de taxas -->
        <div class="table-container">
          <table class="fees-table">
            <thead>
              <tr>
                <th><strong>Tipo</strong></th>
                <th><strong>Aplicação</strong></th>
                <th><strong>Percentual</strong></th>
                <th><strong>Valor</strong></th>
                <th><strong>C. Receitas</strong></th>
                <th><strong>Status</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tarifa de ...</strong></td>
                <td><strong>Transações</strong></td>
                <td><strong>3%</strong></td>
                <td><strong>R$999</strong></td>
                <td><strong>Receita de Taxas</strong></td>
                <td><strong>Ativada</strong></td>
              </tr>
              <tr>
                <td><strong>Tarifa de ...</strong></td>
                <td><strong>Pagamentos</strong></td>
                <td><strong>Fixo</strong></td>
                <td><strong>R$999</strong></td>
                <td><strong>Receita de Taxas</strong></td>
                <td><strong>Desativada</strong></td>
              </tr>
              <tr>
                <td><strong>Tarifa de ...</strong></td>
                <td><strong>Transferência</strong></td>
                <td><strong>2,5%</strong></td>
                <td><strong>R$999</strong></td>
                <td><strong>Receita de Taxas</strong></td>
                <td><strong>Ativada</strong></td>
              </tr>
              <tr>
                <td><strong>Tarifa de ...</strong></td>
                <td><strong>Retiradas</strong></td>
                <td><strong>5%</strong></td>
                <td><strong>R$999</strong></td>
                <td><strong>Receita de Taxas</strong></td>
                <td><strong>Ativada</strong></td>
              </tr>
              <tr>
                <td><strong>Tarifa de ...</strong></td>
                <td><strong>Transações</strong></td>
                <td><strong>Fixo</strong></td>
                <td><strong>R$999</strong></td>
                <td><strong>Receita de Taxas</strong></td>
                <td><strong>Ativada</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { ref, onMounted, onUnmounted } from 'vue';


const isSidebarCollapsed = ref(false);


function handleSidebarToggle(event) {
  isSidebarCollapsed.value = event.detail.isCollapsed;
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
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f6f6f6;
  transition: margin-left 0.3s ease, width 0.3s ease;
  width: calc(100% - 250px);
}


.content-expanded {
  width: calc(100% - 80px);
}

h2 {
  font-size: 40px;
  color: #12283F;
  text-align: center;
  margin-bottom: 50px;
  margin-right: 1350px;
}

.border-container {
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #412884;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  max-width: 1600px;
  height: 700px;
  flex-shrink: 0;
}

.container {
  display: flex;
  gap: 5rem;
  margin: 5rem auto 0 auto;
  justify-content: center;
  flex-wrap: wrap;
}

.t {
  border-radius: 10px;
  border: 2px solid #412884;
  width: 300px;
  height: 100px;
  flex-shrink: 0;
  font-size: 20px;
}

h1 {
  font-family: 'TL';
  margin-left: 15px;
  font-size: 32px;
}

p {
  font-family: 'TL';
  margin-left: 15px;
  margin-top: 20px;
}


.tx {
  margin-left: 46px;
  margin-top: 29px;
  font-size: 40px;
  border-bottom: none; 
}

/* Estilos da tabela */
.table-container {
  width: 90%;
  margin: 20px auto;
  overflow-x: auto;
}

.fees-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
  margin-top: 10px; 
}

.fees-table th {
  text-align: left;
  padding: 15px 10px;
  font-weight: bold;
  border-bottom: 1px solid #000; 
}

.fees-table td {
  padding: 15px 10px;
  border-bottom: 1px solid #000; 
}

.fees-table tbody tr:after {
  content: none;
}

.fees-table tbody tr:not(:last-child) {
  border-bottom: none;
}

/* Responsividade */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  
  .content, .content-expanded {
    width: 100%;
    margin-top: 60px; /* Altura da sidebar no mobile */
  }
  
  .border-container {
    width: 100%;
    height: auto;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }
  
  .container {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .t {
    width: 90%;
  }
  
  .tx {
    margin-left: 20px;
    font-size: 30px;
  }
  
  .fees-table {
    font-size: 16px;
  }
  
  .fees-table th, .fees-table td {
    padding: 10px 5px;
  }
}
</style>