<template>
  <div class="layout">
    <SidebarAdmin />
    <div class="content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <h2>Cadastro de Adquirente</h2>
      <!-- Conteúdo futuro pode ir aqui -->
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
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
}
</style>
