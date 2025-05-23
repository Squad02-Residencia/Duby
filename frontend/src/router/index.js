import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/Login.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import SubmitPage from '../pages/Submit.vue';

// Páginas do Admin
import CadastroAdquirente from '../pages/admin/CadastroAdquirente.vue';
import CadastroBanco from '../pages/admin/CadastroBanco.vue';
import Clientes from '../pages/admin/Clientes.vue';
import ClientesConciliacao from '../pages/admin/ClientesConciliação.vue';

// Páginas do Cliente
import DashboardPage from '../pages/cliente/Dashboard.vue';
import GerirTaxas from '../pages/cliente/GerirTaxas.vue';
import InformacoesFinanceiras from '../pages/cliente/InformacoesFinanceiras.vue';

const routes = [
  // Públicas
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/submit', name: 'submit', component: SubmitPage },

  // Admin
  { path: '/cadastro-adquirente', name: 'CadastroAdquirente', component: CadastroAdquirente, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/cadastro-banco', name: 'CadastroBanco', component: CadastroBanco, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/clientes', name: 'Clientes', component: Clientes, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/clientes-conciliacao', name: 'ClientesConciliacao', component: ClientesConciliacao, meta: { requiresAuth: true, role: 'admin' } },

  // Cliente
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true, role: 'cliente' } },
  { path: '/gerir-taxas', name: 'GerirTaxas', component: GerirTaxas, meta: { requiresAuth: true, role: 'cliente' } },
  { path: '/informacoes-financeiras', name: 'InformacoesFinanceiras', component: InformacoesFinanceiras, meta: { requiresAuth: true, role: 'cliente' } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Proteção de rotas com verificação do tipo de usuário
// Proteção de rotas com verificação do tipo de usuário
router.beforeEach((to, from, next) => {
  const tipoUsuarioRaw = localStorage.getItem('tipoUsuario');
  const tipoUsuario = tipoUsuarioRaw ? tipoUsuarioRaw.toLowerCase() : null;

  if (to.meta.requiresAuth) {
    if (!tipoUsuario) {
      // Usuário não logado
      return next('/');
    } else if (to.meta.role && to.meta.role !== tipoUsuario) {
      // Usuário logado, mas sem permissão
      return next('/');
    }
  }

  next();
});

export default router;
