<script setup>
  document.documentElement.lang = 'pt-BR';
</script>

<template>
  <div id="app">
    <Sidebar /> <!-- Sidebar fixa -->
    <div class="content">
        <router-view /> <!-- Conteúdo dinâmico das páginas -->
    </div>
  </div>
</template>

<style>
/*add estilo global do app aqui */

* {
  margin: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
