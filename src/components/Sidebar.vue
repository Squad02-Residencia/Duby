<template>
    <div :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
        <div class="top-icons">
            <button @click="toggleSidebar" class="menu-btn">
            <i class="bx bx-menu"></i>
        </button>
        <router-link to="/dashboard" class="icon">
            <i class="bx bx-home"></i>
            <span v-if= !isCollapsed>Dashboard</span>
        </router-link>

        <div class="icon">
            <i class="bx bx-star"></i>
            <span v-if= !isCollapsed>Infos</span>
        </div>
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
</template>

<style>
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
</style>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
}
</script>
