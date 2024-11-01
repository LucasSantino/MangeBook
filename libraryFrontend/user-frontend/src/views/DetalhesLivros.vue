<template>
    <div class="container">
      <!-- Navbar -->
      <header class="navbar">
        <button class="menu-btn" @click="toggleSidebar">☰</button>
        <h1 class="logo">
          <router-link to="/" style="color: white; text-decoration: none;">MangeBook</router-link>
        </h1>
        
        <!-- Barra de pesquisa -->
        <div class="search-container">
          <input type="text" class="search-bar" v-model="searchQuery" placeholder="Pesquisar livros...">
          <button class="search-icon" @click="searchBooks">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </header>
  
      <!-- Sidebar -->
      <div v-if="sidebarOpen" class="sidebar">
        <button class="close-btn" @click="toggleSidebar">×</button>
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/favoritos">Favoritos</router-link></li>
          <li><router-link to="/perfil">Perfil</router-link></li>
          <li><router-link to="/emprestimos">Empréstimos</router-link></li>
          <li><router-link to="/sobre">Sobre</router-link></li>
        </ul>
      </div>
  
      <!-- Conteúdo principal -->
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
  
        <!-- Opção para reservar o livro -->
        <div class="reservar-container">
          <span>Clque no botão para reservar</span>
          <button class="reservar-livro" @click="reserveBook">Reservar Livro</button>
        </div>
      
        <!-- Seção de Comentários -->
        <div class="comentarios">
          <h4>Comentários e Avaliações</h4>
          <div class="comentarios-container">
            <table class="comentario">
              <tr>
                <th>Usuário</th>
                <th>Comentário</th>
                <th>Avaliação</th>
              </tr>
              <tr v-for="(comment, index) in comments" :key="index">
                <td>{{ comment.user }}</td>
                <td>{{ comment.text }}</td>
                <td>{{ '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating) }}</td>
              </tr>
            </table>
          </div>
        </div>
  
        <form class="form-comentario" @submit.prevent="submitComment">
          <h4>Deixe seu comentário</h4>
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="newComment.user" placeholder="Seu nome" required>
          </div>
          <div class="form-group">
            <label for="comentario">Comentário:</label>
            <textarea id="comentario" v-model="newComment.text" rows="4" placeholder="Escreva seu comentário aqui..." required></textarea>
          </div>
          
          <div class="form-group">
            <label for="avaliacao">Avaliação:</label>
            <select id="avaliacao" v-model="newComment.rating" required>
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
        <p><router-link to="/politica-privacidade">Política de Privacidade</router-link> | <router-link to="/termos-servico">Termos de Serviço</router-link></p>
        <p>Entre em contato: <a href="mailto:contato@mangebook.com">contato@mangebook.com</a></p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebarOpen: false,
        searchQuery: '',
        book: {
          image: '/imagens/Harry Potter4.webp',
          title: 'Nome do Livro',
          author: 'Nome do Autor',
          year: '2024',
          genre: 'Ficção Científica',
          isbn: '978-3-16-148410-0',
          availableCopies: 5,
          description: 'Esta é uma breve descrição do livro...',
        },
        comments: [
          { user: 'Usuário 1', text: 'Excelente livro! Recomendo muito.', rating: 5 },
          { user: 'Usuário 2', text: 'Uma leitura agradável, mas o final deixou a desejar.', rating: 3 },
        ],
        newComment: {
          user: '',
          text: '',
          rating: ''
        }
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
      searchBooks() {
        // Implementar a lógica de pesquisa aqui
        console.log('Buscando por:', this.searchQuery);
      },
      reserveBook() {
        // Implementar a lógica de reserva do livro aqui
        console.log('Reservar livro:', this.book.title);
      },
      submitComment() {
        if (this.newComment.user && this.newComment.text && this.newComment.rating) {
          this.comments.push({ ...this.newComment });
          this.newComment = { user: '', text: '', rating: '' }; // Resetar o formulário
        }
      }
    }
  }
  </script>
  
  <style scoped>
/* Reset de estilo básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Estilo do corpo */
body {
    background-color: #f0f0f0; /* Cor de fundo */
    font-family: Arial, sans-serif; /* Fonte padrão */
}

/* Estilo da navbar */
.navbar {
    background-color: #00334e;
    color: white;
    padding: 10px;
    text-align: center;
    font-weight: bold;
}

/* Container principal */
main {
    width: 90%; /* Aumente a porcentagem conforme necessário */
    max-width: 1200px; /* Limite a largura máxima */
    margin: 20px auto; /* Centraliza o conteúdo e dá um espaçamento acima e abaixo */
    padding: 20px; /* Espaçamento interno */
    margin-top: 50px;
    margin-bottom: 50px;
}

/* Estilo do título "welcome-title" */
.welcome-title {
    text-align: center; /* Centraliza o texto */
    font-size: 2rem; /* Aumenta o tamanho da fonte */
    margin-top: 40px;
    margin-bottom: 20px; /* Espaçamento inferior */
    color: #00334e; /* Cor do título */
    font-weight: bold; /* Negrito */
}

/* Container de detalhes do livro */
.detalhes-container {
    display: flex; /* Alinha os itens em linha */
    align-items: stretch; /* Estica para a mesma altura */
    gap: 20px; /* Espaço entre imagem e tabela */
    background-color: #fff; /* Fundo branco */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
    padding: 20px;
    margin-bottom: 20px; /* Ajusta o espaçamento inferior */
}

/* Miniatura do livro */
.book-thumbnail {
    width: 300px;
    height: auto; /* Mantém a proporção */
    max-height: 100%; /* Limita a altura para não exceder o container */
    object-fit: cover; /* Preenche sem distorcer */
    border-radius: 8px;
    flex-shrink: 0; /* Evita que a imagem encolha */
}

/* Container dos detalhes */
.detalhes-livro {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Tabela de detalhes */
table {
    width: 100%;
    height: 100%;
    border-collapse: separate; /* Permite bordas arredondadas */
    border-spacing: 0; /* Remove espaços entre células */
    border-radius: 8px; /* Borda arredondada na tabela */
    overflow: hidden; /* Garante que o conteúdo respeite as bordas */
}

th, td {
    padding: 10px;
    text-align: left;
    border-radius: 8px; /* Bordas arredondadas nas células */
    border: none; /* Remove as bordas */
}

th {
    background-color: #f0f0f0;
    font-weight: bold;
}

/* Seção de comentários */
.comentarios {
    margin-top: 20px;
}

/* Container de comentários */
.comentarios-container {
    background-color: #fff; /* Cor de fundo branca */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra leve */
    padding: 20px; /* Espaçamento interno */
    margin-top: 10px; /* Margem superior */
}

/* Comentário individual */
.comentario {
    width: 100%;
    border-collapse: separate; /* Permite bordas arredondadas */
    border-spacing: 0; /* Remove espaços entre células */
}

.comentario th, .comentario td {
    padding: 10px;
    text-align: left;
    border-radius: 8px; /* Bordas arredondadas nas células do comentário */
    border: none; /* Remove as bordas */
}

.comentario th {
    background-color: #f0f0f0;
    font-weight: bold;
}

.comentario tr:nth-child(even) {
    background-color: #f9f9f9; /* Alterna a cor de fundo das linhas */
}

/* Formulário de comentários */
.form-comentario {
    background-color: #f9f9f9;
    padding: 20px; /* Espaçamento interno */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-top: 20px; /* Adiciona espaçamento superior ao formulário */
    margin-bottom: 30px; /* Margem inferior para separar de outros elementos */
}

/* Estilo do título dentro do formulário de comentários */
.form-comentario h4 {
    margin-bottom: 15px; /* Adiciona espaçamento abaixo do título */
}

/* Grupos de formulário */
.form-group {
    margin-bottom: 20px; /* Adiciona espaçamento inferior entre os grupos de formulário */
}

/* Campos de entrada */
input[type="text"],
textarea,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; /* Mantém a borda arredondada */
    border-radius: 5px; /* Bordas arredondadas nos campos de entrada */
}

/* Botão de envio */
.enviar-comentario {
    background-color: #00334e;
    color: white;
    padding: 10px 20px;
    border: none; /* Remove a borda do botão */
    border-radius: 5px; /* Bordas arredondadas no botão */
    cursor: pointer;
}

.enviar-comentario:hover {
    background-color: #004c66;
}


/* Seção de reserva */
.reservar-container {
    margin-top: 20px; /* Espaçamento acima da seção de reserva */
    padding: 15px; /* Espaçamento interno */
    background-color: #f9f9f9; /* Fundo da seção */
    border-radius: 8px; /* Bordas arredondadas */
    display: flex; /* Adiciona flexbox */
    justify-content: center; /* Centraliza os itens */
    align-items: center; /* Alinha verticalmente */
    gap: 10px; /* Espaço entre o texto e o botão */
}

.reservar-livro {
    background-color: #00334e; /* Cor do botão */
    color: white; /* Cor do texto */
    padding: 10px 20px; /* Espaçamento interno do botão */
    border: none; /* Remove a borda do botão */
    border-radius: 5px; /* Bordas arredondadas do botão */
    cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
}

.reservar-livro:hover {
    background-color: #005577; /* Cor do botão ao passar o mouse */
}


/* Rodapé */
.footer {
    background-color: #00334e;
    color: white;
    text-align: center;
    padding: 10px;
}  </style>
  