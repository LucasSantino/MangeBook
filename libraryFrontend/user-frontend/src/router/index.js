import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue'; // Página de Login
import Index from '@/views/index.vue'; // Página de conteúdo após login
import DetalhesLivros from '@/views/DetalhesLivros.vue'; // Página de detalhes do livro
import MeusLivros from '@/views/MeusLivros.vue'; // Pagina Meus Livros

const routes = [
  {
    path: '/',
    name: 'Login', // Esta é a rota inicial
    component: Login, // A página de Login será carregada primeiro
  },
  {
    path: '/index',
    name: 'Index', // Página de conteúdo após login (se necessário)
    component: Index,
  },
  {
    path: '/detalhes-livros/:bookId',  // Rota com parâmetro bookId
    name: 'DetalhesLivros',  // Nome da rota para acesso por referência
    component: DetalhesLivros,
    props: true,  // Permite passar o parâmetro bookId como prop para o componente
  },
  {
    path: '/meus-livros',
    name: 'MeusLivros',
    component: MeusLivros, // Componente da página "Meus Livros"
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
