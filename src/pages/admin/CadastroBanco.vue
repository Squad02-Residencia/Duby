<template>
  <div class="dashboard">
    <SidebarAdmin />
    <div class="content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <h1>Cadastro de Banco</h1>
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
</style>
