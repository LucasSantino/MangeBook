import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue'; // Página de Login
import Index from '@/views/index.vue'; // Página de conteúdo após login
import DetalhesLivros from '@/views/DetalhesLivros.vue'; // Página de detalhes do livro
import MeusLivros from '@/views/MeusLivros.vue'; // Pagina Meus Livros
import Favoritos from '@/views/Favoritos.vue';
import ListaDesejos from '@/views/ListaDesejos.vue'; // Importação única
import PerfilUsuario from '@/views/PerfilUsuario.vue';

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
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: Favoritos, // Componente da página "Favoritos"
  },
  {
    path: '/lista-desejos',
    name: 'ListaDesejos',
    component: ListaDesejos, // Componente da página "Lista de Desejos"
  },
  {
    path: '/perfil-usuario',
    name: 'PerfilUsuarui',
    component: PerfilUsuario, // Componente da página "Perfil de Usuario"
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
