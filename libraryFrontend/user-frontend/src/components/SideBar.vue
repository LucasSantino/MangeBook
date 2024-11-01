<template>
    <div v-if="visible" id="sidebar" class="sidebar">
      <button class="close-btn" @click="closeSidebar">×</button>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/favoritos">Favoritos</router-link></li>
        <li><router-link to="/perfil">Perfil</router-link></li>
        <li><router-link to="/emprestimos">Empréstimos</router-link></li>
        <li><router-link to="/sobre">Sobre</router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeSidebar() {
        this.$emit('close-sidebar');
      },
    },
  };
  </script>
  
  <style scoped>
/* Navbar */
.navbar {
    background-color: #00334e;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 10px;
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.menu-btn {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.logo {
    font-size: 24px;
    text-align: center;
}

/* Barra de pesquisa */
.search-container {
    position: relative;
    width: 250px;
}

.search-bar {
    width: 100%;
    padding: 8px 40px 8px 10px;
    border-radius: 5px;
    border: none;
}

.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
}  </style>
  