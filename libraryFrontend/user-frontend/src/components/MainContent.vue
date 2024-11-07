<template>
  <main>
    <!-- Container de Boas-Vindas -->
    <div class="welcome-container">
      <h2 class="welcome-title">Bem-vindo à MangeBook</h2>
      <p>Explore nosso acervo e gerencie seus empréstimos de forma eficiente!</p>
      
      <!-- Container de Filtros -->
      <div class="filter-container">
        <div>
          <label class="filter-label" for="author">Autor</label>
          <select id="author" class="filter-button" v-model="filters.author">
            <option value="all">Todos</option>
            <option value="author1">Autor 1</option>
            <option value="author2">Autor 2</option>
          </select>
        </div>
        <div>
          <label class="filter-label" for="genre">Gênero</label>
          <select id="genre" class="filter-button" v-model="filters.genre">
            <option value="all">Todos</option>
            <option value="fiction">Ficção</option>
            <option value="non-fiction">Não Ficção</option>
          </select>
        </div>
        <div>
          <label class="filter-label" for="year">Ano de Publicação</label>
          <select id="year" class="filter-button" v-model="filters.year">
            <option value="all">Todos</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Livros em Destaque -->
    <section class="featured-books">
      <h3 class="featured-title">Livros em Destaque</h3>
      <div class="book-list">
        <div v-for="(book, index) in filteredBooks" :key="index" class="book-card">
          <a :href="book.detailsLink">
            <img :src="book.image" :alt="book.title" class="book-image" />
            <h5>{{ book.title }}</h5>
            <h5>Autor: {{ book.author }}</h5>
            <h5>Disponibilidade: {{ book.availability }}</h5>
          </a>
        </div>
      </div>
    </section>

    <!-- Navegação de Páginas -->
    <div class="pagination">
      <button class="btn-navegacao" aria-label="Página anterior" @click="changePage('previous')">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="btn-navegacao" aria-label="Próxima página" @click="changePage('next')">Próximo</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        author: 'all',
        genre: 'all',
        year: 'all'
      },
      books: [
        {
          title: 'Título do Livro 1',
          author: 'Autor 1',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/livro1.jpg',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html'
        },
        {
          title: 'Título do Livro 2',
          author: 'Autor 2',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/Harry Potter 2.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html'
        },
        // Adicione todos os outros livros aqui...
      ],
      currentPage: 1,
      booksPerPage: 6
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        return (
          (this.filters.author === 'all' || book.author === this.filters.author) &&
          (this.filters.genre === 'all' || book.genre === this.filters.genre) &&
          (this.filters.year === 'all' || book.year === this.filters.year)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = start + this.booksPerPage;
      return this.filteredBooks.slice(start, end);
    }
  },
  methods: {
    changePage(direction) {
      if (direction === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
/* Adicione os estilos necessários aqui */

/* Estilo para o container de boas-vindas */
.welcome-container {
  margin-bottom: 20px;
}

/* Filtros */
.filter-container {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.filter-label {
  font-weight: bold;
}

.filter-button {
  padding: 5px;
  font-size: 16px;
}

/* Livros em Destaque */
.featured-books {
  margin-top: 30px;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.book-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.book-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-navegacao {
  background-color: #00334e;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.btn-navegacao:hover {
  background-color: #005577;
}
</style>
