import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/Login.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import DashboardPage from '../pages/Dashboard.vue'; // Importei a Dashboard certinho
import SubmitPage from '../pages/Submit.vue';
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
  {
    path: '/submit',
    name: 'submit',
    component: SubmitPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // DEIXA process.env BASE_URL mesmo!
  routes,
});

export default router;
