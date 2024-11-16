<template>
    <div class="container">
      <NavBar @toggle-sidebar="toggleSidebar" />
      <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
      <main>
      </main>
    </div>
  </template>
  
  <script>

  import NavBar from '@/components/NavBar.vue';
  import SideBar
   from '@/components/SideBar.vue';
   export default {
    components: {
      NavBar,
      SideBar,
    },

    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
  },
  };
  
  </script>
  
  <style scoped>
  /* Adicione seus estilos personalizados aqui */
  h1 {
    color: #00334e;
  }
  </style>
  