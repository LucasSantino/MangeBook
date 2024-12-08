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
import adm_UsersLista from '@/views/adm_UsersLista.vue';
import adm_CadastroUsers from '@/views/adm_CadastroUsers.vue';
import adm_PerfilUser from '@/views/adm_PerfilUser.vue';
import adm_EditLivro from '@/views/adm_EditLivro.vue';
import Login_CadastroUsers from '@/views/Login_CadastroUsers.vue';
import EditPerfil from '@/views/EditPerfil.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login_cadastrousers',
    name: 'Login_CadastroUsers',
    component: Login_CadastroUsers,
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
  },
  /*
  {
    path: '/detalhes-livros/:bookId',
    name: 'DetalhesLivros',
    component: DetalhesLivros,
    props: true,
  },*/
  {
    path: '/livro/:bookId',
    name: 'DetalhesLivros',
    component: DetalhesLivros,
    props: true,
  },  
  {
    path: '/meus-livros',
    name: 'MeusLivros',
    component: MeusLivros,
  },
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: Favoritos,
  },
  {
    path: '/lista-desejos',
    name: 'ListaDesejos',
    component: ListaDesejos,
  },
  {
    path: '/perfil-usuario',
    name: 'PerfilUsuario',
    component: PerfilUsuario,
  },
  {
    path: '/editperfil',
    name: 'EditPerfil',
    component: EditPerfil,
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico,
  },
  {
    path: '/notifica',
    name: 'Notifica',
    component: Notifica,
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre,
  },
  {
    path: '/adm_dashboard',
    name: 'adm_Dashboard',
    component: adm_Dashboard,
  },
  {
    path: '/adm_cadastrolivro',
    name: 'adm_CadastroLivro',
    component: adm_CadastroLivro,
  },
  {
    path: '/adm_livroslista',
    name: 'adm_LivrosLista',
    component: adm_LivrosLista,
  },
  {
    path: '/adm_editlivro/:id',
    name: 'adm_EditLivro',
    component: adm_EditLivro,
    props: true,
  },
  {
    path: '/adm_userslista',
    name: 'adm_UsersLista',
    component: adm_UsersLista,
  },
  {
    path: '/adm_cadastrousers',
    name: 'adm_CadastroUsers',
    component: adm_CadastroUsers,
  },
  {
    path: '/perfil-usuario/:usuarioId',  // Rota para exibir o perfil do usuário
    name: 'adm_PerfilUser', // Nome da rota de perfil de usuário
    component: adm_PerfilUser, // Componente do perfil
    props: true, // Passa o parametro usuarioId como prop
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
