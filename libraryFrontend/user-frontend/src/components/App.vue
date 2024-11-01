<template>
    <div id="app">
      <Navbar @toggle-sidebar="toggleSidebar" />
      <Sidebar :visible="sidebarVisible" @close-sidebar="toggleSidebar" />
      <MainContent />
      <footer class="footer">
        <p>&copy; 2024 MangeBook. Todos os direitos reservados.</p>
        <p><a href="#">Política de Privacidade</a> | <a href="#">Termos de Serviço</a></p>
        <p>Entre em contato: <a href="mailto:contato@mangebook.com">contato@mangebook.com</a></p>
      </footer>
    </div>
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue';
  import Sidebar from './components/Sidebar.vue';
  import MainContent from './components/MainContent.vue';
  
  export default {
    components: {
      Navbar,
      Sidebar,
      MainContent,
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
  </style>
  