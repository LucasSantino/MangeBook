<template>
  <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" /> <!-- Passando o evento para abrir/fechar a Sidebar -->
    <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" /> <!-- Passando o estado da Sidebar -->
    <MainContent /> <!-- Importação do Conteúdo Principal-->
  </div>
</template>

<script>
import MainContent from "@/components/MainContent.vue";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar,
    MainContent,
  },

  data() {
    return {
      sidebarOpen: false,  // Controle do estado de visibilidade da Sidebar
      dropdown: {},        // Controle do dropdown, se necessário
      currentPage: 1,      // Controle de páginas (se necessário para paginação)
    };
  },

  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;  // Alterna o estado da Sidebar
    },

    toggleDropdown(menu) {
      this.dropdown[menu] = !this.dropdown[menu];  // Alterna o estado do dropdown
    },

    changePage(direction) {
      if (direction === 'prev' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next') {
        this.currentPage++;
      }
    }
    
  }
};
</script>

<style scoped>
/* Reset de estilo básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif; /* Fonte padrão */
}
</style>
