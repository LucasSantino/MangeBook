import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue'; // Página de Login
import Index from '@/views/index.vue'; // Página de conteúdo após login
import DetalhesLivros from '@/views/DetalhesLivros.vue'; // Página de detalhes do livro
import MeusLivros from '@/views/MeusLivros.vue'; // Pagina Meus Livros
import Favoritos from '@/views/Favoritos.vue';
import ListaDesejos from '@/views/ListaDesejos.vue'; // Importação única
import PerfilUsuario from '@/views/PerfilUsuario.vue';
import Historico from '@/views/Historico.vue';
import Notifica from '@/views/Notifica.vue';
import Sobre from '@/views/Sobre.vue';
import adm_Dashboard from '@/views/adm_Dashboard.vue'; // Importando a página do painel administrativo
import adm_CadastroLivro from '@/views/adm_CadastroLivro.vue';
import adm_LivrosLista from '@/views/adm_LivrosLista.vue';
import adm_UsersLista from '@/views/adm_UsersLista.vue'
import adm_CadastroUsers from '@/views/adm_CadastroUsers.vue';
import adm_PerfilUser from '@/views/adm_PerfilUser.vue';
import adm_EditLivro from '@/views/adm_EditLivro.vue';

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
  {
    path: '/historico',
    name: 'Historico',
    component: Historico, // Componente da página "Historico"
  },
  {
    path: '/notifica',
    name: 'Notifica',
    component: Notifica, // Componente da página "Notificaçoes"
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre, // Componente da página "Notificaçoes"
  },
  {
    path: '/adm_dashboard', // Nova rota para o painel administrativo
    name: 'adm_Dashboard', // Nome da rota para facilitar a navegação
    component: adm_Dashboard, // Componente da página do painel administrativo
  },
  {
    path: '/adm_cadastrolivro', // Nova rota para o painel administrativo
    name: 'adm_CadastroLivro', // Nome da rota para facilitar a navegação
    component: adm_CadastroLivro, // Componente da página do painel administrativo
  },
  {
    path: '/adm_livroslista', // Nova rota para o painel administrativo
    name: 'adm_LivrosLista', // Nome da rota para facilitar a navegação
    component: adm_LivrosLista, // Componente da página do painel administrativo
  },
  {
    path: '/adm_editlivro/:id',
    name: 'adm_EditLivro',
    component: adm_EditLivro,
    props: true, // Passa o ID como uma prop para o componente
  },
  {
    path: '/adm_userslista', // Nova rota para o painel administrativo
    name: 'adm_UsersLista', // Nome da rota para facilitar a navegação
    component: adm_UsersLista, // Componente da página do painel administrativo
  },
  {
    path: '/adm_cadastrousers', // Nova rota para o painel administrativo
    name: 'adm_CadastroUsers', // Nome da rota para facilitar a navegação
    component: adm_CadastroUsers, // Componente da página do painel administrativo
  },
  {
    path: '/adm_perfiluser', // Nova rota para o painel administrativo
    name: 'adm_PerfilUsers', // Nome da rota para facilitar a navegação
    component: adm_PerfilUser, // Componente da página do painel administrativo
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
