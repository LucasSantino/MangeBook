<template>
  <header class="navbar">
    <button class="menu-btn" @click="toggleSidebar">☰</button>
    <h1 class="logo">
      <span 
        v-if="isLoginPage" 
        style="color: white; text-decoration: none; cursor: default;"
      >
        MangeBook
      </span>
      <router-link 
        v-else 
        to="/index" 
        style="color: white; text-decoration: none;"
      >
        MangeBook
      </router-link>
    </h1>

    <!-- Barra de Pesquisa -->
    <div class="search-container">
      <input 
        type="text" 
        class="search-bar" 
        placeholder="Pesquisar livros..." 
        v-model="searchQuery" 
        @input="searchBooks"
      />
      <button class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>

      <!-- Dropdown de Resultados -->
      <div v-if="filteredBooks.length > 0" class="dropdown-results">
        <ul>
          <li 
            v-for="book in filteredBooks" 
            :key="book._id" 
            class="dropdown-item"
            @click="goToBookDetails(book._id)"
          >
            <span class="book-title">{{ book.bookTitle }}</span> - <span class="book-author">{{ book.bookAuthor }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <button 
        class="notification-icon" 
        @click="irParaNotificacoes" 
        :disabled="isLoginPage" 
        :style="{ cursor: isLoginPage ? 'not-allowed' : 'pointer' }"
      >
        <img :src="icone" alt="Notificações" class="notification-img">
      </button>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import icone from '@/assets/IconeNotificação.png';

export default {
  data() {
    return {
      icone,
      searchQuery: '',
      allBooks: [],
      filteredBooks: [],
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    irParaNotificacoes() {
      if (!this.isLoginPage) {
        this.$router.push('/notifica');
      }
    },
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        this.allBooks = response.data;
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },
    searchBooks() {
      const query = this.searchQuery.toLowerCase();
      this.filteredBooks = this.allBooks.filter(
        (book) =>
          book.bookTitle.toLowerCase().includes(query) ||
          book.bookAuthor.toLowerCase().includes(query)
      );
    },
    goToBookDetails(bookId) {
      this.$router.push({ name: 'DetalhesLivros', params: { bookId } }); // Usando parâmetros na navegação
      this.searchQuery = ''; // Limpa a barra de pesquisa
      this.filteredBooks = []; // Limpa os resultados filtrados
    }
  },
  mounted() {
    this.fetchBooks();
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
    margin-top: 0;
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

/* Dropdown de Resultados */
.dropdown-results {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    background-color: #00334e; /* Cor da navbar */
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-results ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.dropdown-item {
    padding: 10px;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.book-title {
    font-weight: bold;
    font-size: 14px;
}

.book-author {
    font-size: 12px;
    color: #ccc; /* Cor secundária para o autor */
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
    width: 30px;
    height: 30px;
}
</style>





