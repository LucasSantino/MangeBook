<template>
  <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" /> <!-- Passando o evento para abrir/fechar a Sidebar -->
    <component :is="sidebarComponent" :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" /> <!-- Sidebar dinâmica -->
    <MainContent /> <!-- Importação do Conteúdo Principal-->
  </div>
</template>

<script>
import MainContent from "@/components/MainContent.vue";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import adm_SideBar from "@/components/adm_SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar,
    MainContent,
    adm_SideBar,
  },

  data() {
    return {
      sidebarOpen: false,  // Controle do estado de visibilidade da Sidebar
      dropdown: {},        // Controle do dropdown, se necessário
      currentPage: 1,      // Controle de páginas (se necessário para paginação)
      userRole: '',        // Armazenará o papel do usuário (admin ou user)
    };
  },

  computed: {
    sidebarComponent() {
      return this.userRole === 'admin' ? 'adm_SideBar' : 'SideBar';
    }
  },

  created() {
    // Verificar o tipo de usuário no localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userRole = user.role;
    } else {
      this.userRole = 'user'; // Caso o usuário não esteja logado, default para 'user'
    }
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
