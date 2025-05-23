<template>
  <div class="app">
    <SidebarAdmin />
    <main class="main-content">
      <div class="header">
        <h2>Clientes Duby Conciliação</h2>
        <button @click="abrirModalAdicionar" class="btn-green">Adicionar Cliente</button>
      </div>

  <div class="search-container">
  <div class="search-box-wrapper">
    <i class="bx bx-search-alt search-icon"></i>
    <input
      v-model="termoBusca"
      type="text"
      class="search-box"
      placeholder="Buscar cliente"
    />
  </div>
  <button @click="mostrarModalFiltro = true" class="filter-btn">Filtrar</button>
</div>



      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Setor</th>
              <th>Situação</th>
              <th>Contato</th>
              <th>Email</th>
              <th>Controles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cliente, index) in clientesFiltrados" :key="index">
              <td>{{ cliente.nome }}</td>
              <td>{{ cliente.setor }}</td>
              <td :class="cliente.situacao.toLowerCase()">{{ cliente.situacao }}</td>
              <td>{{ cliente.contato }}</td>
              <td>{{ cliente.email }}</td>
              <td>
                <div class="controls">
                  <button class="control-btn" @click="editarCliente(index)">Editar</button>
                  <button class="control-btn" @click="excluirCliente(index)">Excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Modal: Adicionar/Editar Cliente -->
    <div v-if="mostrarModalCliente" class="popup-overlay">
      <div class="popup-content">
        <h3>{{ editandoCliente !== null ? 'Editar Cliente' : 'Adicionar Novo Cliente' }}</h3>
        <form @submit.prevent="salvarCliente">
          <label>Nome:</label>
          <input v-model="novoCliente.nome" type="text" required />
          <label>Email:</label>
          <input v-model="novoCliente.email" type="email" required />
          <label>Setor:</label>
          <input v-model="novoCliente.setor" type="text" required />
          <label>Situação:</label>
          <select v-model="novoCliente.situacao" required>
            <option value="Pago">Pago</option>
            <option value="Devendo">Devendo</option>
          </select>
          <label>Contato:</label>
          <input v-model="novoCliente.contato" @input="formatarContato" type="text" required />

          <div class="popup-buttons">
            <button type="submit" class="btn-green">Salvar</button>
            <button type="button" @click="fecharModal" class="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal: Filtro -->
    <div v-if="mostrarModalFiltro" class="popup-overlay">
      <div class="popup-content">
        <h3>Filtrar Clientes</h3>
        <form @submit.prevent="aplicarFiltros">
          <label>Setor:</label>
          <select v-model="filtro.setor">
            <option value="Todos">Todos</option>
            <option value="Varejo">Varejo</option>
            <option value="Tecnologia">Tecnologia</option>
          </select>
          <label>Situação:</label>
          <select v-model="filtro.situacao">
            <option value="Todos">Todos</option>
            <option value="Pago">Pago</option>
            <option value="Devendo">Devendo</option>
          </select>

          <div class="popup-buttons">
            <button type="submit" class="btn-green">Aplicar Filtros</button>
            <button type="button" @click="mostrarModalFiltro = false" class="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

const termoBusca = ref('')
const mostrarModalCliente = ref(false)
const mostrarModalFiltro = ref(false)
const editandoCliente = ref(null)

const filtro = ref({
  setor: 'Todos',
  situacao: 'Todos',
})

const clientes = ref([
  { nome: 'Nome Fictício', email: 'email@exemplo.com', setor: 'Varejo', situacao: 'Pago', contato: '(99) 99999-9999' },
  { nome: 'Nome Fictício', email: 'email@exemplo.com', setor: 'Tecnologia', situacao: 'Pago', contato: '(99) 99999-9999' },
  { nome: 'Nome Fictício', email: 'email@exemplo.com', setor: 'Varejo', situacao: 'Devendo', contato: '(99) 99999-9999' },
])

const novoCliente = ref({
  nome: '',
  email: '',
  setor: '',
  situacao: 'Pago',
  contato: '',
})

// Máscara de telefone (estilo Brasil)
function formatarContato() {
  let valor = novoCliente.value.contato.replace(/\D/g, '')
  if (valor.length > 11) valor = valor.slice(0, 11)

  if (valor.length === 11) {
    valor = valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
  } else if (valor.length >= 10) {
    valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  novoCliente.value.contato = valor
}

function abrirModalAdicionar() {
  editandoCliente.value = null
  Object.assign(novoCliente.value, {
    nome: '',
    email: '',
    setor: '',
    situacao: 'Pago',
    contato: '',
  })
  mostrarModalCliente.value = true
}

function salvarCliente() {
  if (editandoCliente.value !== null) {
    clientes.value[editandoCliente.value] = { ...novoCliente.value }
  } else {
    clientes.value.push({ ...novoCliente.value })
  }
  fecharModal()
}

function editarCliente(index) {
  editandoCliente.value = index
  Object.assign(novoCliente.value, clientes.value[index])
  mostrarModalCliente.value = true
}

function excluirCliente(index) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    clientes.value.splice(index, 1)
  }
}

function fecharModal() {
  mostrarModalCliente.value = false
  editandoCliente.value = null
}

function aplicarFiltros() {
  mostrarModalFiltro.value = false
}

const clientesFiltrados = computed(() => {
  return clientes.value.filter(cliente => {
    const nomeOuEmailMatch =
      cliente.nome.toLowerCase().includes(termoBusca.value.toLowerCase()) ||
      cliente.email.toLowerCase().includes(termoBusca.value.toLowerCase())
    const setorMatch = filtro.value.setor === 'Todos' || cliente.setor === filtro.value.setor
    const situacaoMatch = filtro.value.situacao === 'Todos' || cliente.situacao === filtro.value.situacao
    return nomeOuEmailMatch && setorMatch && situacaoMatch
  })
})
</script>


<style scoped>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #f9f9f9;
  }
  
  .app {
  display: flex;
  flex-direction: row;
  }
  
  .sidebar {
  width: 60px;
  background-color: #3e2077;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  min-height: 100vh;
  }
  
  .nav-icons > div {
  margin: 1rem 0;
  font-size: 1.2rem;
  cursor: pointer;
  }
  
  .profile-pic {
  display: flex;
  }
  
  .main-content {
  flex: 1;
  padding: 2rem;
  }
  
  .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  }
  
  .btn-green {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  }
  
  .search-box {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  }
  
  .table-container {
  background: white;
  border: 1px solid #3e2077;
  border-radius: 10px;
  overflow-x: auto;
  }
  
  table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  }
  
  th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #3f207760;
  }
  
  th {
  background-color: #f2f2f2;
  }
  
  td small {
  display: block;
  color: gray;
  }
  
  td.pago {
  color: green;
  }
  
  td.devendo {
  color: red;
  }
  
  td .controls {
  display: flex;
  gap: 0.5rem;
  }
  
  .control-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  }
  
  /* Pop-up overlay */
  .popup-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  }
  
  /* Pop-up content */
  .popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  margin: 100px auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  }
  
  .popup-content h3 {
  margin-top: 0;
  }
  
  .popup-content label {
  display: block;
  margin-top: 10px;
  }
  
  .popup-content input,
  .popup-content select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  }
  
  .popup-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  }
  
  .btn-cancel {
  background-color: #ccc;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  }
  .btn-cancel:hover {
  background-color: #aaa;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
  .app {
  flex-direction: column;
  }
  
  .sidebar {
  flex-direction: row;
  width: 100%;
  min-height: auto;
  justify-content: space-around;
  padding: 0.5rem;
  }
  
  .profile-pic {
  display: none;
  }
  
  .main-content {
  padding: 1rem;
  }
  
  .header {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  }
  
  .btn-green {
  width: 100%;
  }
  
  .table-container {
  overflow-x: auto;
  }
  
  table {
  min-width: 600px;
  }
  
  .popup-content {
  width: 90%;
  margin: 2rem auto;
  }
  }
  
  @media (max-width: 480px) {
  .popup-content {
  padding: 1rem;
  }
  
  .popup-buttons {
  flex-direction: column;
  align-items: stretch;
  }
  
  .btn-green,
  .btn-cancel {
  width: 100%;
  }
  }

.popup-content input,
.popup-content select {
width: 100%;
padding: 6px 8px; /* Reduzido /
font-size: 0.875rem; / Fonte menor /
margin-top: 4px; / Menor espaço acima */
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
}
/* Estilos para a barra de pesquisa com o botão de filtro */
/* Estilos para a barra de pesquisa com o botão de filtro */
.search-container {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
}

.search-box-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #4A3480;
  pointer-events: none;
}

.search-box {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.2rem; /* Padding à esquerda para não sobrepor a lupa */
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  height: 40px;
  box-sizing: border-box;
}

.filter-btn {
  padding: 0 16px;
  background-color: #4CAF50;
  color: white;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
}

.filter-btn:hover {
  background-color: #45a049;
}



/* Estilo do Modal */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex; /* <- ISSO É ESSENCIAL PARA FUNCIONAR */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}

.popup-buttons button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}
</style>
