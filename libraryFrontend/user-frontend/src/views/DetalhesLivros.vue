<template>
  <div class="container">
    <!-- Navbar -->
    <header class="navbar">
      <button class="menu-btn" @click="toggleSidebar">☰</button>
      <h1 class="logo">
        <router-link to="/" class="logo-link">MangeBook</router-link>
      </h1>

      <!-- Barra de pesquisa com ícone SVG -->
      <div class="search-container">
        <input v-model="searchQuery" type="text" class="search-bar" placeholder="Pesquisar livros...">
        <button class="search-icon" @click="searchBook">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
      <div>
        <!-- Ícone de notificação -->
        <button class="notification-icon">
          <img src="/Site - MangeBook/imagens/IconeNotificação.png" alt="Notificações" class="notification-img">
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <div v-show="sidebarVisible" class="sidebar">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <div class="sidebar-image">
        <img src="/Site - MangeBook/imagens/MangeBookLogo.png" alt="Imagem da Sidebar" class="sidebar-img">
      </div>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li>
          <a href="#" @click="toggleDropdown">Minha Biblioteca</a>
          <ul v-show="dropdownVisible" class="dropdown-menu">
            <li><router-link to="/MeusLivros">Meus Livros</router-link></li>
            <li><router-link to="/Favoritos">Favoritos</router-link></li>
            <li><router-link to="/ListaDesejos">Lista de Desejos</router-link></li>
          </ul>
        </li>
        <li><router-link to="/Sobre">Sobre</router-link></li>
        <li><router-link to="/logout" class="logout-btn">Sair</router-link></li>
      </ul>
    </div>

    <!-- Detalhes do Livro -->
    <main>
      <h2 class="welcome-title">Detalhes do Livro</h2>
      <div class="detalhes-container">
        <img :src="book.image" alt="Capa do Livro" class="book-thumbnail">
        <div class="detalhes-livro">
          <table>
            <tr>
              <th>Título do Livro:</th>
              <td>{{ book.title }}</td>
            </tr>
            <tr>
              <th>Autor</th>
              <td>{{ book.author }}</td>
            </tr>
            <tr>
              <th>Ano de Publicação</th>
              <td>{{ book.year }}</td>
            </tr>
            <tr>
              <th>Gênero</th>
              <td>{{ book.genre }}</td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td>{{ book.isbn }}</td>
            </tr>
            <tr>
              <th>Número de Cópias Disponíveis</th>
              <td>{{ book.availableCopies }}</td>
            </tr>
            <tr>
              <th>Descrição</th>
              <td>{{ book.description }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="reservar-container">
        <button class="reservar-livro" @click="reserveBook">Reservar Livro</button>
        <button class="adicionar-desejos" @click="addToWishlist">Adicionar à Lista de Desejos</button>
      </div>

      <div class="comentarios">
        <h4>Comentários e Avaliações</h4>
        <div class="comentarios-container">
          <table class="comentario">
            <tr>
              <th>Usuário</th>
              <th>Comentário</th>
              <th>Avaliação</th>
            </tr>
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{ comment.user }}</td>
              <td>{{ comment.text }}</td>
              <td>{{ '★'.repeat(comment.rating) }}</td>
            </tr>
          </table>
        </div>
      </div>

      <form @submit.prevent="submitComment" class="form-comentario">
        <h4>Deixe seu comentário</h4>
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input v-model="newComment.name" type="text" id="nome" placeholder="Seu nome" required>
        </div>
        <div class="form-group">
          <label for="comentario">Comentário:</label>
          <textarea v-model="newComment.text" id="comentario" rows="4" placeholder="Escreva seu comentário aqui..." required></textarea>
        </div>
        <div class="form-group">
          <label for="avaliacao">Avaliação:</label>
          <select v-model="newComment.rating" id="avaliacao" required>
            <option value="" disabled selected>Selecione uma avaliação</option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <button type="submit" class="enviar-comentario">Enviar Comentário</button>
      </form>
    </main>

    <!-- Rodapé -->
    <footer class="footer">
      <p>&copy; 2024 MangeBook. Todos os direitos reservados.</p>
      <p><router-link to="/privacy-policy">Política de Privacidade</router-link> | <router-link to="/terms-of-service">Termos de Serviço</router-link></p>
      <p>Entre em contato: <a href="mailto:contato@mangebook.com">contato@mangebook.com</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        title: 'Nome do Livro',
        author: 'Nome do Autor',
        year: 2024,
        genre: 'Ficção Científica',
        isbn: '978-3-16-148410-0',
        availableCopies: 5,
        description: 'Esta é uma breve descrição do livro...',
        image: '/Site - MangeBook/imagens/Harry Potter4.webp',
      },
      comments: [
        { id: 1, user: 'Usuário 1', text: 'Excelente livro! Recomendo muito.', rating: 5 },
        { id: 2, user: 'Usuário 2', text: 'Uma leitura agradável, mas o final deixou a desejar.', rating: 3 },
        { id: 3, user: 'Usuário 3', text: 'Excelente livro! Recomendo muito.', rating: 5 },
      ],
      newComment: {
        name: '',
        text: '',
        rating: '',
      },
      sidebarVisible: false,
      dropdownVisible: false,
      searchQuery: ''
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    searchBook() {
      console.log('Pesquisar:', this.searchQuery);
    },
    reserveBook() {
      alert('Livro reservado!');
    },
    addToWishlist() {
      alert('Livro adicionado à Lista de Desejos!');
    },
    submitComment() {
      const comment = { ...this.newComment, id: Date.now() };
      this.comments.push(comment);
      this.newComment = { name: '', text: '', rating: '' };
    }
  }
};
</script>

<style scoped>
/* Adicione seus estilos CSS aqui */
.container {
  font-family: Arial, sans-serif;
}
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
}
.logo-link {
  color: white;
  text-decoration: none;
}
.search-container {
  display: flex;
}
.search-bar {
  padding: 5px;
  margin-right: 10px;
}
.search-icon {
  background-color: transparent;
  border: none;
  color: white;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #f4f4f4;
  padding: 20px;
  display: none;
}
.sidebar img {
  width: 100%;
  margin-bottom: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar ul li {
  margin: 10px 0;
}
.sidebar ul li a {
  text-decoration: none;
  color: #333;
}
.detalhes-container {
  display: flex;
  margin-top: 20px;
}
.book-thumbnail {
  width: 150px;
  height: 200px;
  margin-right: 20px;
}
.detalhes-livro table {
  border-collapse: collapse;
  width: 100%;
}
.detalhes-livro table th, .detalhes-livro table td {
  padding: 10px;
  border: 1px solid #ddd;
}
.reservar-container {
  margin-top: 20px;
}
.reservar-livro, .adicionar-desejos {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.comentarios-container {
  margin-top: 20px;
}
.comentario th, .comentario td {
  padding: 10px;
  text-align: left;
}
footer {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
}
footer a {
  text-decoration: none;
}
</style>
