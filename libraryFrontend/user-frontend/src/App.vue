<template>
  <div id="app">
    <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
    <NavBar @toggle-sidebar="toggleSidebar" />
    <!-- Sidebar, recebe a propriedade isSidebarOpen para abrir/fechar -->
    <SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <MainContent></MainContent>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import MainContent from './components/MainContent.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    NavBar,
    SideBar,
    MainContent,
    Footer
  },
  data() {
    return {
      isSidebarOpen: false, // Controla a visibilidade da sidebar
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Alterna a visibilidade da sidebar
    },
  },
};
</script>

<style>
/* Estilos gerais */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
