<template>
  <div class="dashboard layout">
    <SidebarAdmin />
    <div class="content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <div class="header">
        <h2>Clientes</h2>
        <button class="add-btn" @click="abrirModalAdicionar">Adicionar Cliente</button>
      </div>

      <div class="search-box">
        <input type="text" v-model="termoBusca" placeholder="Pesquisar cliente..." />
      </div>

      <div class="card-grid">
        <div v-for="client in clientesFiltrados" :key="client.email" class="card">
          <div class="card-image">
            <img :src="client.photo" alt="Foto do cliente" />
          </div>
          <h3 class="card-name">{{ client.name }}</h3>
          <span class="card-role manager">{{ client.role }}</span>
          <p class="card-email">{{ client.email }}</p>
          <p class="card-phone">{{ client.phone }}</p>
          <p class="card-company">{{ client.company }}</p>
          <div class="card-buttons">
            <button class="btn-outline" @click="abrirPerfil(client)">Perfil</button>
            <button class="btn-outline" @click="abrirChat(client.phone)">Mensagem</button>
          </div>
        </div>
      </div>

      <!-- Modal Adicionar Cliente -->
      <div v-if="modalAdicionarVisivel" class="modal-overlay">
        <div class="modal">
          <h2>Adicionar Cliente</h2>
          <form @submit.prevent="salvarCliente">
            <input type="text" v-model="novoCliente.name" placeholder="Nome completo" required />
            <input type="text" v-model="novoCliente.company" placeholder="Empresa" required />
            <input type="text" v-model="novoCliente.role" placeholder="Cargo" required />
            <input type="email" v-model="novoCliente.email" placeholder="Email" required />
            <input type="tel" v-model="novoCliente.phone" placeholder="Telefone" required />
            <input type="file" @change="carregarFoto" accept="image/*" />
            <button type="submit">Salvar</button>
            <button type="button" @click="fecharModalAdicionar">Cancelar</button>
          </form>
        </div>
      </div>

      <!-- Modal Perfil -->
      <div v-if="perfilVisivel" class="modal-overlay">
        <div class="modal">
          <h2>Perfil do Cliente</h2>
          <img :src="perfilSelecionado.photo" alt="Foto" style="width:100px; border-radius:50%;" />
          <p><strong>Nome:</strong> {{ perfilSelecionado.name }}</p>
          <p><strong>Email:</strong> {{ perfilSelecionado.email }}</p>
          <p><strong>Telefone:</strong> {{ perfilSelecionado.phone }}</p>
          <p><strong>Cargo:</strong> {{ perfilSelecionado.role }}</p>
          <p><strong>Empresa:</strong> {{ perfilSelecionado.company }}</p>
          <button @click="perfilVisivel = false">Fechar</button>
        </div>
      </div>

      <!-- Modal Chat -->
      <div v-if="chatVisivel" class="modal-overlay">
        <div class="modal">
          <h2>Enviar Mensagem</h2>
          <textarea v-model="mensagem" placeholder="Digite sua mensagem..." rows="4"></textarea>
          <button @click="enviarMensagemWhatsApp">Enviar via WhatsApp</button>
          <button @click="chatVisivel = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isSidebarCollapsed = ref(false)
const termoBusca = ref('')
const mensagem = ref('')
const telefoneAtual = ref('')

const modalAdicionarVisivel = ref(false)
const perfilVisivel = ref(false)
const chatVisivel = ref(false)
const fotoSelecionada = ref('')

const perfilSelecionado = ref({})
const clientes = ref([])

const novoCliente = ref({
  name: '',
  company: '',
  role: '',
  email: '',
  phone: '',
  photo: ''
})

const clientesFiltrados = computed(() => {
  return clientes.value.filter(c =>
    c.name.toLowerCase().includes(termoBusca.value.toLowerCase())
  )
})

function abrirModalAdicionar() {
  modalAdicionarVisivel.value = true
}

function fecharModalAdicionar() {
  modalAdicionarVisivel.value = false
  novoCliente.value = { name: '', company: '', role: '', email: '', phone: '', photo: '' }
}

function carregarFoto(event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    novoCliente.value.photo = reader.result
  }
  if (file) reader.readAsDataURL(file)
}

function salvarCliente() {
  clientes.value.push({ ...novoCliente.value })
  salvarNoLocalStorage()
  fecharModalAdicionar()
}

function abrirPerfil(client) {
  perfilSelecionado.value = client
  perfilVisivel.value = true
}

function abrirChat(phone) {
  telefoneAtual.value = phone
  mensagem.value = ''
  chatVisivel.value = true
}

function enviarMensagemWhatsApp() {
  if (mensagem.value.trim() !== '') {
    const numero = telefoneAtual.value.replace(/[^0-9]/g, '')
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem.value)}`
    window.open(link, '_blank')
    chatVisivel.value = false
  }
}

function salvarNoLocalStorage() {
  localStorage.setItem('clientes', JSON.stringify(clientes.value))
}

function carregarDoLocalStorage() {
  const dados = localStorage.getItem('clientes')
  if (dados) {
    clientes.value = JSON.parse(dados)
  } else {
    clientes.value = [
      {
        name: 'Maria Fernandes',
        company: 'TechBrasil',
        role: 'Gerente de Projetos',
        email: 'maria@techbrasil.com',
        phone: '(11) 98888-7777',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        name: 'João Silva',
        company: 'InovaTI',
        role: 'Desenvolvedor',
        email: 'joao@inovati.com',
        phone: '(21) 97777-8888',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    ]
    salvarNoLocalStorage()
  }
}

function handleSidebarToggle(event) {
  isSidebarCollapsed.value = event.detail.isCollapsed
}

onMounted(() => {
  carregarDoLocalStorage()
  window.addEventListener('sidebar-toggle', handleSidebarToggle)
  const sidebarElement = document.querySelector('.sidebar')
  if (sidebarElement && sidebarElement.classList.contains('sidebar-collapsed')) {
    isSidebarCollapsed.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('sidebar-toggle', handleSidebarToggle)
})
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
  background-color: #f2f4f8;
}

.content-expanded {
  width: calc(100% - 80px);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
}

.add-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 20px;
}

.card {
  background-color: #cfd4d9;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #979a9d;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100px;
  height: 100px;
  margin: 0 auto 12px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0d7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-name {
  font-size: 1rem;
  font-weight: bold;
  margin: 8px 0 4px;
  word-break: break-word;
}

.card-role.manager {
  background-color: #e0f7ec;
  color: #28a745;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-bottom: 8px;
  font-weight: 500;
  display: inline-block;
}

.card-email,
.card-phone,
.card-company {
  font-size: 0.85rem;
  color: #555;
  margin: 2px 0;
}

.card-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-outline {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-outline:hover {
  background-color: #f0f0f0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal input,
.modal textarea,
.modal button {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
  .content {
    padding: 1rem;
  }
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  .card {
    padding: 12px;
  }
  .card-image {
    height: 100px;
  }
  .add-btn,
  .search-box input {
    font-size: 0.9rem;
  }
}
</style>