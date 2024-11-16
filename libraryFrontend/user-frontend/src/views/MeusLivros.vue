<template>
    <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" /> <!-- Passando o evento para abrir/fechar a Sidebar -->
    <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" /> <!-- Passando o estado da Sidebar -->
    <MainContent /> <!-- Importação do Conteúdo Principal-->
    </div>


</template>

<script>

import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavBar,
    SideBar,
  },


  
}


</script>

<style scoped>

</style>