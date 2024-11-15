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
        <div v-for="(book, index) in paginatedBooks" :key="index" class="book-card">
          <!-- Navegação ao clicar no título ou imagem do livro -->
          <a @click.prevent="goToBookDetails(index)">
            <img :src="book.image" :alt="book.title" class="book-image" />
            <h5>{{ book.title }}</h5>
            <h6>Autor: {{ book.author }}</h6>
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
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2023
        },
        {
          title: 'Título do Livro 2',
          author: 'Autor 2',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/Harry Potter 2.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2022
        },
        {
          title: 'Título do Livro 3',
          author: 'Autor 3',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/PercyJacksom1.jpg',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Aventura',
          year: 2023
        },
        {
          title: 'Título do Livro 4',
          author: 'Autor 4',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/Harry Potter4.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2022
        },
        {
          title: 'Título do Livro 5',
          author: 'Autor 5',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/Harry Potter 2.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Fantasia',
          year: 2023
        },
        {
          title: 'Título do Livro 6',
          author: 'Autor 6',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/Harry Potter3.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2021
        },
        {
          title: 'Título do Livro 7',
          author: 'Autor 7',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/Harry Potter6.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Aventura',
          year: 2023
        },
        {
          title: 'Título do Livro 8',
          author: 'Autor 8',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/Harry Potter7.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2022
        },
        {
          title: 'Título do Livro 9',
          author: 'Autor 9',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/Harry Potter 2.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2023
        },
        {
          title: 'Título do Livro 10',
          author: 'Autor 10',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/PercyJacksom3.jpg',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Aventura',
          year: 2021
        },
        {
          title: 'Título do Livro 11',
          author: 'Autor 11',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/PercyJacksom4.jpg',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Aventura',
          year: 2023
        },
        {
          title: 'Título do Livro 12',
          author: 'Autor 12',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/PercyJacksom5.jpg',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2022
        },
        {
          title: 'Título do Livro 13',
          author: 'Autor 13',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/livro13.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2023
        },
        {
          title: 'Título do Livro 14',
          author: 'Autor 14',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/Livro14.jpg',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2022
        },
        {
          title: 'Título do Livro 15',
          author: 'Autor 15',
          availability: 'Disponível',
          image: '/Site - MangeBook/imagens/Livro 15.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Ficção',
          year: 2023
        },
        {
          title: 'Título do Livro 16',
          author: 'Autor 16',
          availability: 'Indisponível',
          image: '/Site - MangeBook/imagens/livrop16.webp',
          detailsLink: '/Site - MangeBook/DetalhesLivros.html',
          genre: 'Fantasia',
          year: 2021
        }
      ],
      currentPage: 1,
      booksPerPage: 12
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
    },
    goToBookDetails(bookId) {
      this.$router.push({ name: 'DetalhesLivros', params: { bookId } });
    }
  }
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
    width: 180px; /* Largura fixa */
    height: 300px; /* Altura fixa */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.book-card a {
    text-decoration: none; /* Remove o sublinhado */
    color: inherit; /* Herda a cor do texto do elemento pai */
}

/* Imagem do livro */
.book-image {
    width: 100%;
    height: 200px;
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
</style>
