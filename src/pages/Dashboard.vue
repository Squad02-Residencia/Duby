<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <div class="top-icons">
        <button @click="toggleSidebar" class="menu-btn">
          <i class="bx bx-menu"></i>
        </button>
        <router-link to="/dashboard" class="icon">
          <i class="bx bx-home"></i>
        </router-link>

        <div class="icon"><i class="bx bx-star"></i></div>
        <div class="icon"><i class="bx bx-heart"></i></div>
        <div class="icon"><i class="bx bx-folder"></i></div>
        <div class="icon"><i class="bx bx-calendar"></i></div>
      </div>

      <div class="bottom-icons">
        <div class="icon"><i class="bx bx-bell"></i></div>
        <div class="icon"><i class="bx bx-help-circle"></i></div>
        <div class="icon"><i class="bx bx-cog"></i></div>
        <div class="icon"><i class="bx bx-user"></i></div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="content-wrapper" :class="{ 'content-expanded': isCollapsed }">
      <div class="main-content">
        <h1>Bem-vindo à sua Dashboard!</h1>
        <p>Modificar pela real sidebar e real página de dashboard!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  background-color: #412884;
  color: #fff;
  width: 250px;
  min-width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s, min-width 0.3s;
}

.sidebar-collapsed {
  width: 80px;
  min-width: 80px;
}

.top-icons,
.bottom-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.icon {
  cursor: pointer;
  font-size: 26px;
}

.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

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
  .sidebar {
    width: 100%;
    min-width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
  }
  .top-icons, .bottom-icons {
    flex-direction: row;
  }
}
</style>
