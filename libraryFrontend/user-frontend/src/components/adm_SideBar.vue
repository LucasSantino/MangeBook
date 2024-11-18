<template>
    <transition name="fade">
      <div v-show="isSidebarOpen" class="sidebar" :class="{ open: isSidebarOpen }">
        <!-- Botão para fechar a Sidebar -->
        <button class="close-btn" @click="closeSidebar">×</button>
  
        <!-- Imagem no topo da sidebar -->
        <div class="sidebar-image">
          <!-- Envolvendo a imagem com router-link -->
          <router-link to="/index">
            <img :src="logo" alt="Imagem da Sidebar" class="sidebar-img">
          </router-link>
        </div>
  
        <!-- Lista de Links -->
        <ul>
          <!-- Link Acervo -->
          <li><router-link to="/index">Acervo</router-link></li>
  
          <!-- Link Dashboard -->
          <li><router-link to="/adm_dashboard">Estatísticas</router-link></li>
  
          <!-- Menu Gerenciamento de Livros com Dropdown -->
          <li @click="toggleBooksDropdown">
            <a href="javascript:void(0)">
              <i class="fas fa-book"></i> Gerenciamento de Livros
              <img :class="['seta-icone', { rotacionado: isBooksDropdownOpen }]" src="https://cdn-icons-png.flaticon.com/512/271/271210.png" alt="Ícone seta">
            </a>
            <ul v-show="isBooksDropdownOpen" class="dropdown-menu">
              <li><router-link to="/adm_cadastrolivro">Cadastro de Livros</router-link></li>
              <li><router-link to="/adm_livroslista">Livros Cadastrados</router-link></li>
            </ul>
          </li>
  
          <!-- Menu Gerenciamento de Usuários com Dropdown -->
          <li @click="toggleUsersDropdown">
            <a href="javascript:void(0)">
              <i class="fas fa-users"></i> Gerenciamento de Usuários
              <img :class="['seta-icone', { rotacionado: isUsersDropdownOpen }]" src="https://cdn-icons-png.flaticon.com/512/271/271210.png" alt="Ícone seta">
            </a>
            <ul v-show="isUsersDropdownOpen" class="dropdown-menu">
              <li><router-link to="/Site - MangeBook/Adm_UsuariosCasdastro.html">Cadastro de Usuários</router-link></li>
              <li><router-link to="/adm_userslista">Usuários Cadastrados</router-link></li>
            </ul>
          </li>
  
          <!-- Opção Sobre -->
          <li><router-link to="/sobre">Sobre</router-link></li>
  
          <!-- Botão de Sair -->
          <li><a href="javascript:void(0)" @click="logout" class="logout-btn">Sair</a></li>
        </ul>
      </div>
    </transition>
  </template>
  
  <script>
  import logo from '@/assets/LogoMangeBook.png'; // Importando a imagem da logo
  
  export default {
    props: {
      isSidebarOpen: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        isBooksDropdownOpen: false, // Controla a visibilidade do dropdown de "Gerenciamento de Livros"
        isUsersDropdownOpen: false, // Controla a visibilidade do dropdown de "Gerenciamento de Usuários"
      };
    },
    computed: {
      logo() {
        return logo;
      }
    },
    methods: {
      closeSidebar() {
        this.$emit('toggle-sidebar'); // Emite o evento para fechar a sidebar
      },
      toggleBooksDropdown() {
        this.isBooksDropdownOpen = !this.isBooksDropdownOpen; // Alterna a visibilidade do dropdown de "Gerenciamento de Livros"
      },
      toggleUsersDropdown() {
        this.isUsersDropdownOpen = !this.isUsersDropdownOpen; // Alterna a visibilidade do dropdown de "Gerenciamento de Usuários"
      },
      logout() {
        // Remove o token e informações do usuário do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redireciona para a tela de login
        this.$router.push({ name: 'Login' }); // Redireciona para a rota 'login'
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilo para a imagem no topo da sidebar */
  .sidebar-image {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .sidebar-img {
    width: 100%;
    max-width: 220px;
    height: auto;
    border-radius: 10px;
    margin-top: 5px;
  }
  
  .sidebar {
    left: 0;
    position: fixed;
    left: -250px; /* Inicialmente fora da tela */
    top: 0;
    width: 250px;
    height: 100%;
    background-color: #00334e;
    color: white;
    padding-top: 80px;
    transition: left 0.3s ease-out, opacity 0.3s ease-out; /* Transição suave de entrada/saída */
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.4);
    opacity: 0; /* Inicialmente invisível */
  }
  
  .sidebar.open {
    left: 0; /* Quando a Sidebar estiver aberta, ela será posicionada corretamente */
    opacity: 1; /* Torna visível quando aberta */
  }
  
  /* Remover pontos de lista */
  .sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  /* Estilos dos links da sidebar */
  .sidebar ul li a {
    color: #f0f0f0;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 0px;
    transition: background-color 0.3s ease;
  }
  
  .sidebar ul li a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    margin-right: 8px;
  }
  
  /* Ícone da seta */
  .seta-icone {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
    margin-left: auto;
    margin-right: 15px;
    filter: invert(1);
  }
  
  /* Rotacionando a seta quando o dropdown é visível */
  .rotacionado {
    transform: rotate(180deg);
  }
  
  /* Fechar botão da sidebar */
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
  
  /* Adicionando espaçamento entre as opções da sidebar */
  .sidebar ul li {
    margin-bottom: 15px;
  }
  
  .dropdown-menu {
    display: block;
    list-style-type: none;
    padding-left: 20px;
    background-color: #00577b;
  }
  
  .dropdown-menu li a {
    color: #f0f0f0;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 0;
    display: block;
    transition: background-color 0.3s ease;
  }
  
  .dropdown-menu li a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
  
  .logout-btn {
    color: white;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    display: block;
    background-color: #00334e;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s;
    margin-top: auto;
  }
  
  .logout-btn:hover {
    background-color: #00577b;
    transform: scale(1.05);
  }
  </style>
  