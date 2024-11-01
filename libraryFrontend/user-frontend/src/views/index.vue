<template>
  <div id="app">
    <!-- Navbar -->
    <header class="navbar">
      <button class="menu-btn" @click="toggleSidebar">☰</button>
      <h1 class="logo">
        <a href="index.html" style="color: white; text-decoration: none;">MangeBook</a>
      </h1>
      <div class="search-container">
        <input type="text" class="search-bar" placeholder="Pesquisar livros..." />
        <button class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <div v-if="isSidebarOpen" class="sidebar">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Favoritos</a></li>
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Empréstimos</a></li>
        <li><a href="#">Sobre</a></li>
      </ul>
    </div>

    <!-- Conteúdo principal -->
    <main>
      <h2 class="welcome-title">Bem-vindo à MangeBook</h2>
      <p>Explore nosso acervo e gerencie seus empréstimos de forma eficiente!</p>
      
      <section class="featured-books">
        <h3 class="featured-title">Livros em Destaque</h3>
        <div class="book-list">
          <book-card v-for="book in books" :key="book.id" :book="book" />
        </div>
      </section>
    </main>

    <!-- Rodapé -->
    <footer class="footer">
      <p>&copy; 2024 MangeBook. Todos os direitos reservados.</p>
      <p><a href="#">Política de Privacidade</a> | <a href="#">Termos de Serviço</a></p>
      <p>Entre em contato: <a href="mailto:contato@mangebook.com">contato@mangebook.com</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      books: [
        { id: 1, title: 'Título do Livro 1', author: 'Autor 1', availability: 'Disponível', image: '/imagens/livro1.jpg' },
        { id: 2, title: 'Título do Livro 2', author: 'Autor 2', availability: 'Disponível', image: '/imagens/Harry Potter 2.webp' },
        // Adicione mais livros conforme necessário
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
/* Adicione aqui seus estilos CSS */
</style>
