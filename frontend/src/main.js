import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'boxicons/css/boxicons.min.css';
import router from './router';  // Importando o Vue Router

// Criando a aplicação Vue, usando o Vue Router, e montando no elemento com id 'app'
createApp(App)
  .use(router)  // Usando o Vue Router
  .mount('#app');  // Montando a aplicação no elemento com id 'app'
