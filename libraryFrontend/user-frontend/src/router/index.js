import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';  // Página de Login
import Index from '@/views/index.vue';  // Página de conteúdo após login

const routes = [
  {
    path: '/',
    name: 'Login',  // Esta é a rota inicial
    component: Login,  // A página de Login será carregada primeiro
  },
  {
    path: '/index',
    name: 'Index',  // Página de conteúdo após login (se necessário)
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
