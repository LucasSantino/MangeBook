<template>
  <div id="app">
    <!-- Navbar com toggle de sidebar -->
    <Navbar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar com controle de visibilidade -->
    <Sidebar :visible="sidebarVisible" @close-sidebar="toggleSidebar" />

    <!-- Conteúdo Principal (componente renderizado por Vue Router) -->
    <router-view></router-view> <!-- O conteúdo renderizado pelo Vue Router vai para cá -->

    <!-- Rodapé (Footer fixo em todas as páginas) -->
    <Footer /> <!-- O Footer é fixo aqui e não duplicado -->
  </div>
</template>

<script>
// Importando os componentes necessários
import Navbar from './components/NavBar.vue';  
import Sidebar from './components/SideBar.vue';
import Footer from './components/Footer.vue'; 

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    Footer,  // O Footer será renderizado no App.vue
  },
  data() {
    return {
      sidebarVisible: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>

<style>
.footer {
  background-color: #00334e;
  color: white;
  text-align: center;
  padding: 20px;
  width: 100%;
}

nav {
  margin-bottom: 20px;
}
</style>
