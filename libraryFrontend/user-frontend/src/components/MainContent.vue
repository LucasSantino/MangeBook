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
            <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
          </select>
        </div>
        <div>
          <label class="filter-label" for="genre">Gênero</label>
          <select id="genre" class="filter-button" v-model="filters.genre">
            <option value="all">Todos</option>
            <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
        <div>
          <label class="filter-label" for="year">Ano de Publicação</label>
          <select id="year" class="filter-button" v-model="filters.year">
            <option value="all">Todos</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Livros em Destaque -->
    <section class="featured-books">
      <h3 class="featured-title">Livros em Destaque</h3>
      <div v-if="loading" class="loading-message">Carregando livros...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="book-list">
        <div v-for="book in paginatedBooks" :key="book.id" class="book-card">
          <a @click.prevent="goToBookDetails(book.id)">
            <img :src="book.image" :alt="book.title" class="book-image" />
            <h4>{{ book.title }}</h4>
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
import axios from 'axios';

export default {
  data() {
    return {
      filters: {
        author: 'all',
        genre: 'all',
        year: 'all',
      },
      books: [],
      currentPage: 1,
      booksPerPage: 12,
      loading: false,
      error: null,
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => {
        return (
          (this.filters.author === 'all' || book.author === this.filters.author) &&
          (this.filters.genre === 'all' || book.genre === this.filters.genre) &&
          (this.filters.year === 'all' || book.year === parseInt(this.filters.year))
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
    },
    authors() {
      return [...new Set(this.books.map((book) => book.author))];
    },
    genres() {
      return [...new Set(this.books.map((book) => book.genre))];
    },
    years() {
      return [...new Set(this.books.map((book) => book.year))];
    },
  },
  methods: {
    async fetchBooks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        this.books = response.data.map((book) => ({
          id: book._id,
          title: book.bookTitle,
          author: book.bookAuthor,
          availability: book.copiesAvailable > 0 ? 'Disponível' : 'Indisponível',
          image: `http://localhost:3000/${book.bookThumbnail.replace(/\\/g, '/')}`,
          genre: book.bookGenre,
          year: book.publicationYear,
        }));
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        this.error = 'Falha ao carregar os livros. Por favor, tente novamente.';
      } finally {
        this.loading = false;
      }
    },
    changePage(direction) {
      if (direction === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToBookDetails(bookId) {
      this.$router.push({ name: 'DetalhesLivros', params: { bookId } });
    },
    resetPagination() {
      this.currentPage = 1;
    },
  },
  watch: {
    filters: {
      handler() {
        this.resetPagination();
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>



<style scoped>
/* Conteúdo principal */
main {
    margin-top: 70px;
    margin: 0;
    padding: 10px;
    text-align: center;
    font-family: Arial, sans-serif; /* Fonte padrão */
}

/* Estilo do container de boas-vindas */
.welcome-container {
    background-color: #ffffff; /* Cor de fundo do container */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para o efeito de elevação */
    padding: 20px; /* Espaçamento interno */
    text-align: center; /* Centraliza o texto dentro do container */
    margin: 20px auto; /* Margem automática para centralizar */
    width: 100%; /* Largura total do container */
    max-width: 940px; /* Ajuste conforme necessário para se alinhar com a tabela */
    margin-top: 90px; /* Ajuste o valor para aumentar o espaçamento superior */
}

/* Seção de boas-vindas */
.welcome-title {
    font-size: 28px; /* Tamanho da fonte */
    font-weight: bold; /* Negrito */
    margin-bottom: 10px; /* Espaçamento abaixo */
    color: #00334e; /* Cor do texto */
}

/* Seção de livros em destaque */
.featured-title {
    font-size: 24px; /* Tamanho da fonte */
    margin: 20px 0; /* Espaçamento acima e abaixo */
    color: #00334e; /* Cor do texto */
}

/* Seção de livros */
.featured-books {
    margin-top: 20px;
    text-align: center;
}

/* Contêiner dos livros */
.book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px 50px; /* Espaçamento horizontal de 40px e vertical de 50px */
    max-width: 1000px; /* Largura máxima para comportar 5 livros com mais espaço */
    margin: 0 auto;
}

/* Card de livro */
.book-card {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 5px;
    width: 200px; /* Largura fixa */
    height: 430px; /* Altura fixa */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adiciona transição suave para o hover */
}

/* Efeito ao passar o mouse */
.book-card:hover {
    transform: translateY(-5px); /* Eleva o card levemente para cima */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Aumenta a sombra para destacar */
}

.book-card a {
    text-decoration: none; /* Remove o sublinhado */
    color: inherit; /* Herda a cor do texto do elemento pai */
}

h4 {
    color: #00334e; /* Define a cor do texto */
    margin-top: 10px; /* Espaçamento acima do h4 */
    margin-bottom: 10px; /* Espaçamento abaixo do h4 */
}

/* Imagem do livro */
.book-image {
    width: 100%;
    height: 260px;
    object-fit: cover;
    border-radius: 5px;
}

/* Botões de filtro */
.filter-button {
    background-color: #00334e; /* Cor de fundo do botão */
    color: white; /* Cor do texto do botão */
    padding: 5px 10px; /* Diminui o espaçamento interno */
    font-size: 14px; /* Diminui o tamanho da fonte */
    border: none; /* Remove a borda padrão */
    border-radius: 5px; /* Bordas arredondadas do botão */
    cursor: pointer; /* Mão ao passar o mouse */
    transition: background-color 0.3s, transform 0.2s; /* Transições suaves */
}

.filter-button:hover {
    background-color: #00577b; /* Cor do botão ao passar o mouse */
    transform: scale(1.05); /* Aumenta um pouco o tamanho do botão */
}

/* Estilo dos filtros */
.filter-label {
    font-weight: bold; /* Negrito */
    color: #00334e; /* Cor do texto */
    margin-bottom: 5px; /* Espaçamento abaixo do texto */
    display: block; /* Para que fique em cima das opções */
}

/* Contêiner dos filtros */
.filter-container {
    display: flex; /* Flexbox para alinhar horizontalmente */
    justify-content: center; /* Centraliza os filtros */
    gap: 20px; /* Espaçamento entre os filtros */
    margin: 20px 0; /* Espaçamento acima e abaixo */
}

/* Estilo da navegação de páginas */
.pagination {
    display: flex; /* Flexbox para layout */
    justify-content: center; /* Centraliza os botões */
    align-items: center; /* Alinha verticalmente */
    margin-top: 20px; /* Espaçamento superior */
    margin-bottom: 40px; /* Aumenta o espaçamento entre a paginação e o rodapé */
}

.btn-navegacao {
    padding: 10px 20px; /* Espaçamento interno dos botões */
    margin: 0 5px; /* Margem entre os botões */
    cursor: pointer; /* Muda o cursor ao passar por cima */
    border: none; /* Sem borda */
    border-radius: 4px; /* Bordas arredondadas */
    background-color: #00334e; /* Cor de fundo */
    color: white; /* Cor do texto */
    transition: background-color 0.3s; /* Efeito de transição */
}

.btn-navegacao:hover {
    background-color: #0056b3; /* Tom mais escuro ao passar o mouse */
}

/* Estilo do texto da página */
.pagination span {
    margin: 0 15px; /* Margem lateral para o texto */
    color: #333; /* Cor do texto */
}

.loading-message {
  color: #00334e;
  font-size: 18px;
  margin: 20px 0;
}

.error-message {
  color: red;
  font-size: 18px;
  margin: 20px 0;
}
</style>

