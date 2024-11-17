<template>
  <div id="app">
    <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
    <NavBar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar, recebe a propriedade isSidebarOpen para abrir/fechar -->
    <SideBar v-if="!isAdmin" :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    
    <!-- Sidebar Administrativa, recebe a propriedade isSidebarOpen para abrir/fechar -->
    <adm_SideBar v-if="isAdmin" :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Conteúdo principal -->
    <main></main>
    <router-view></router-view> <!-- O conteúdo da rota será renderizado aqui -->
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import adm_SideBar from './components/adm_SideBar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    NavBar,
    adm_SideBar,
    SideBar,
    Footer
  },
  data() {
    return {
      isSidebarOpen: false, // Estado para controlar a visibilidade da sidebar
      isAdmin: false, // Controle para saber se o usuário é admin
    };
  },
  methods: {
    toggleSidebar() {
      // Alterna o estado da sidebar
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
