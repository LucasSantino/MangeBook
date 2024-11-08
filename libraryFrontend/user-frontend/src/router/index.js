import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Index from '../views/index.vue';  // Página inicial, usada tanto para admin quanto para usuários comuns

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',  // Página inicial, acessível tanto para admin quanto para usuário comum
    name: 'index',
    component: Index,
    meta: { requiresAuth: true },  // Requer autenticação para qualquer usuário (admin ou user)
  },
  {
    path: '/admin',  // Acesse a página inicial, mas apenas se for um admin
    name: 'admin',
    component: Index,  // Redireciona para index.vue (tanto para admin quanto para usuário comum)
    meta: { requiresAuth: true, role: 'admin' },  // Requer autenticação para admin
  },
  {
    path: '/user',  // Acesse a página inicial, mas apenas se for um usuário comum
    name: 'user',
    component: Index,  // Redireciona para index.vue (tanto para admin quanto para usuário comum)
    meta: { requiresAuth: true, role: 'user' },  // Requer autenticação para usuário comum
  },
  {
    path: '/:catchAll(.*)',  // Rota coringa para qualquer caminho não encontrado
    redirect: '/login',  // Redireciona para a tela de login
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Proteção das rotas
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token'); // Verifica se o usuário está logado
  const userRole = JSON.parse(localStorage.getItem('user'))?.userType; // Obtém o tipo de usuário

  // Se o usuário já está logado
  if (loggedIn) {
    // Se a rota exigir um tipo específico de usuário
    if (to.meta.role && to.meta.role !== userRole) {
      // Se o usuário tentar acessar uma rota com o tipo errado (ex: admin tentando acessar rota de usuário comum)
      next(userRole === 'admin' ? '/admin' : '/'); // Redireciona conforme o tipo de usuário
    } else {
      next();  // Se a rota for permitida para o tipo de usuário, continua a navegação
    }
  } else {
    // Se não estiver logado e a rota exigir autenticação
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next('/login');  // Redireciona para o login
    } else {
      next();  // Se a rota não requer autenticação, continua normalmente
    }
  }
});

export default router;
