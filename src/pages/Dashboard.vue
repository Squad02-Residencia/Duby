<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Conteúdo Principal -->
    <div class="content" :class="{ 'content-expanded': isCollapsed }">
      <div class="main-content">
        <h1>Bem-vindo à sua Dashboard!</h1>
        <p>Modificar pela real sidebar e real página de dashboard!</p>
      </div>
    </div>
  </div>
</template>

<script setup>

import Sidebar from '../components/Sidebar.vue';

</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
/* Wrapper do Conteúdo */
.content-wrapper {
  flex: 1;
  background: #f5f5f5;
  transition: all 0.3s;
  padding: 40px;
}

/* Quando sidebar fecha, o conteúdo expande */
.content-expanded {
  padding: 40px;
}

/* Conteúdo Principal */
.main-content {
  width: 100%;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
}
</style>
