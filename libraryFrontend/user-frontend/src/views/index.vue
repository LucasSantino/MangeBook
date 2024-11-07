<template>
  <div class="container">
    <!-- Navbar -->
    <header class="navbar">
      <button class="menu-btn" @click="toggleSidebar">☰</button>
      <h1 class="logo">
        <router-link to="/" class="logo-link">MangeBook</router-link>
      </h1>
      <div class="search-container">
        <input type="text" v-model="searchQuery" class="search-bar" placeholder="Pesquisar livros...">
        <button class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <div v-bind:class="{ sidebar: true, 'sidebar-open': sidebarOpen }">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <div class="sidebar-image">
        <img src="/Site - MangeBook/imagens/MangeBookLogo.png" alt="Imagem da Sidebar" class="sidebar-img">
      </div>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li>
          <a href="#" @click="toggleDropdown('library')">
            <i class="fas fa-book"></i> Minha Biblioteca
            <img src="https://cdn-icons-png.flaticon.com/512/271/271210.png" :class="{'rotacionado': dropdown.library}" class="seta-icone" alt="Seta para baixo">
          </a>
          <ul v-show="dropdown.library" class="dropdown-menu">
            <li><router-link to="/meus-livros">Meus Livros</router-link></li>
            <li><router-link to="/favoritos">Favoritos</router-link></li>
            <li><router-link to="/lista-desejos">Lista de Desejos</router-link></li>
          </ul>
        </li>
        <li>
          <a href="#" @click="toggleDropdown('profile')">
            Perfil
            <img src="https://cdn-icons-png.flaticon.com/512/271/271210.png" :class="{'rotacionado': dropdown.profile}" class="seta-icone" alt="Seta para baixo">
          </a>
          <ul v-show="dropdown.profile" class="dropdown-menu">
            <li><router-link to="/perfil-usuario">Informações de Perfil</router-link></li>
            <li><router-link to="/historico">Histórico</router-link></li>
            <li><router-link to="/notificacoes">Notificações</router-link></li>
          </ul>
        </li>
        <li><router-link to="/sobre">Sobre</router-link></li>
        <li><router-link to="/logout" class="logout-btn">Sair</router-link></li>
      </ul>
    </div>

    <!-- Main Content -->
    <main>
      <div class="welcome-container">
        <h2 class="welcome-title">Bem-vindo ao MangeBook</h2>
        <p>Explore a nossa biblioteca de livros e muito mais!</p>
      </div>

      <div class="featured-books">
        <h3 class="featured-title">Livros em Destaque</h3>
        <div class="book-list">
          <BookCard v-for="book in books" :key="book.id" :book="book" />
        </div>
      </div>

      <div class="pagination">
        <button class="btn-navegacao" @click="changePage('prev')">Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button class="btn-navegacao" @click="changePage('next')">Próximo</button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 MangeBook. Todos os direitos reservados.</p>
      <p><router-link to="/politica-privacidade">Política de Privacidade</router-link> | <router-link to="/termos-servico">Termos de Serviço</router-link></p>
      <p>Entre em contato: <a href="mailto:contato@mangebook.com">contato@mangebook.com</a></p>
    </footer>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue"; // Importando o componente BookCard

export default {
  components: {
    BookCard
  },
  data() {
    return {
      sidebarOpen: false,
      searchQuery: '',
      dropdown: {
        library: false,
        profile: false
      },
      currentPage: 1,
      books: [
        { id: 1, title: "Livro 1", author: "Autor 1", cover: "/imagens/livro1.jpg" },
        { id: 2, title: "Livro 2", author: "Autor 2", cover: "/imagens/livro2.jpg" },
        { id: 3, title: "Livro 3", author: "Autor 3", cover: "/imagens/livro3.jpg" },
        { id: 4, title: "Livro 4", author: "Autor 4", cover: "/imagens/livro4.jpg" }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown(menu) {
      this.dropdown[menu] = !this.dropdown[menu];
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
/* Seu código CSS vai aqui */

.sidebar-open {
  left: 0; /* A sidebar aparece quando está aberta */
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* O restante do seu CSS pode ser mantido aqui, com adaptações conforme necessário */
</style>
