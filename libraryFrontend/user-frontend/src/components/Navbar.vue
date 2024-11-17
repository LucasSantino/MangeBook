<template>
  <header class="navbar">
    <button class="menu-btn" @click="toggleSidebar">☰</button>
    <h1 class="logo">
      <router-link to="/index" style="color: white; text-decoration: none;">MangeBook</router-link>
    </h1>

    <div class="search-container">
      <input type="text" class="search-bar" placeholder="Pesquisar livros..." />
      <button class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
    </div>

    <div>
      <button class="notification-icon">
        <img :src="icone" alt="Notificações" class="notification-img">
      </button>
    </div>
  </header>
</template>

<script>
import icone from '@/assets/IconeNotificação.png'; 

export default {
  data() {
    return {
      icone,
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar'); // Emite evento para alternar a visibilidade da sidebar
    },
  },
};
</script>


<style>
/* Reset de estilo básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif; /* Fonte padrão */
}

/* Container principal */
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

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

/* Logo */
.logo {
    font-size: 24px;
    text-align: center;
    margin-top: 0; /* Removido o margin-top exagerado */
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
}

/* Icone de notificação */
.notification-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 10px;
}

.notification-img {
    filter: brightness(0) invert(1); /* Torna o ícone branco */
    width: 30px; /* Aumente o tamanho conforme necessário */
    height: 30px;
}
</style>
