import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/Login.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import DashboardPage from '../pages/Dashboard.vue'; // Importei a Dashboard certinho

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // DEIXA process.env BASE_URL mesmo!
  routes,
});

export default router;
