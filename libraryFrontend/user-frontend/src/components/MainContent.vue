<template>
    <main>
      <h2 class="welcome-title">Bem-vindo à MangeBook</h2>
      <p>Explore nosso acervo e gerencie seus empréstimos de forma eficiente!</p>
  
      <div class="filter-container">
        <div>
          <label class="filter-label" for="author">Autor</label>
          <select id="author" class="filter-button">
            <option value="all">Todos</option>
            <option value="author1">Autor 1</option>
            <option value="author2">Autor 2</option>
          </select>
        </div>
        <div>
          <label class="filter-label" for="genre">Gênero</label>
          <select id="genre" class="filter-button">
            <option value="all">Todos</option>
            <option value="fiction">Ficção</option>
            <option value="non-fiction">Não Ficção</option>
          </select>
        </div>
        <div>
          <label class="filter-label" for="year">Ano de Publicação</label>
          <select id="year" class="filter-button">
            <option value="all">Todos</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      <section class="featured-books">
        <h3 class="featured-title">Livros em Destaque</h3>
        <div class="book-list">
          <BookCard 
            v-for="book in books" 
            :key="book.id" 
            :title="book.title" 
            :author="book.author" 
            :availability="book.availability" 
            :image="book.image" 
            :link="book.link"
          />
        </div>
      </section>
    </main>
  </template>
  
  <script>
  import BookCard from './BookCard.vue';
  
  export default {
    components: {
      BookCard,
    },
    data() {
      return {
        books: [
          { id: 1, title: 'Título do Livro 1', author: 'Autor 1', availability: 'Disponível', image: '/imagens/livro1.jpg', link: 'DetalhesLivros.html' },
          { id: 2, title: 'Título do Livro 2', author: 'Autor 2', availability: 'Indisponível', image: '/imagens/livro2.jpg', link: 'DetalhesLivros.html' },
          // Adicione mais livros aqui
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  main {
      margin-top: 70px;
      padding: 10px;
      text-align: center;
  }
  .welcome-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #00334e;
  }
  .featured-title {
      font-size: 24px;
      margin: 20px 0;
      color: #00334e;
  }
  .filter-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
  }
  .filter-label {
      font-weight: bold;
      color: #00334e;
      margin-bottom: 5px;
      display: block;
  }
  .filter-button {
      background-color: #00334e;
      color: white;
      padding: 5px 10px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
  }
  .filter-button:hover {
      background-color: #00577b;
      transform: scale(1.05);
  }
  </style>
  