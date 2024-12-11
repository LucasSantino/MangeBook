<template>
  <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <!-- Exibição condicional das Sidebars -->
    <SideBar v-if="userRole === 'user'" :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <AdmSideBar v-if="userRole === 'admin'" :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Detalhes do Livro -->
    <main v-if="!loading && !error">
      <h2 class="welcome-title">Detalhes do Livro</h2>
      <div v-if="book" class="detalhes-container">
        <img :src="book.bookThumbnail" alt="Capa do Livro" class="book-thumbnail" />
        <div class="detalhes-livro">
          <table>
            <tr>
              <th>Título do Livro:</th>
              <td>{{ book.title }}</td>
            </tr>
            <tr>
              <th>Autor:</th>
              <td>{{ book.author }}</td>
            </tr>
            <tr>
              <th>Ano de Publicação:</th>
              <td>{{ book.year }}</td>
            </tr>
            <tr>
              <th>Gênero:</th>
              <td>{{ book.genre }}</td>
            </tr>
            <tr>
              <th>ISBN:</th>
              <td>{{ book.isbn || 'Não disponível' }}</td>
            </tr>
            <tr>
              <th>Cópias Disponíveis:</th>
              <td>{{ book.availableCopies }}</td>
            </tr>
            <tr>
              <th>Descrição:</th>
              <td>{{ book.dbookDescription || 'Não disponível' }}</td>
            </tr>
            <tr>
              <th>Avaliação:</th>
              <td>
                {{ '★'.repeat(Math.round(book.rating)) }}
                <span>({{ book.rating.toFixed(1) }})</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-else>
        <p class="error-message">Os detalhes do livro não estão disponíveis.</p>
      </div>

      <!-- Botões de ação -->
      <div class="reservar-container" v-if="book">
        <button class="reservar-livro" @click="reserveBook">Reservar Livro</button>
        <button class="adicionar-desejos" @click="addToWishlist">Adicionar à Lista de Desejos</button>
      </div>

      <!-- Comentários -->
      <div class="comentarios" v-if="book">
        <h4>Comentários e Avaliações</h4>
        <div v-if="comments.length > 0" class="comentarios-container">
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
        <p v-else class="sem-comentarios">Nenhum comentário disponível.</p>
      </div>

      <!-- Formulário para adicionar comentário -->
      <form v-if="book" @submit.prevent="submitComment" class="form-comentario">
        <h4>Deixe seu comentário</h4>
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input v-model="newComment.name" type="text" id="nome" placeholder="Seu nome" required />
        </div>
        <div class="form-group">
          <label for="comentario">Comentário:</label>
          <textarea
            v-model="newComment.text"
            id="comentario"
            rows="4"
            placeholder="Escreva seu comentário aqui..."
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="avaliacao">Avaliação:</label>
          <select v-model="newComment.rating" id="avaliacao" required>
            <option value="" disabled selected>Selecione uma avaliação</option>
            <option v-for="i in 5" :key="i" :value="i">{{ '★'.repeat(i) }}</option>
          </select>
        </div>
        <button type="submit" class="enviar-comentario">Enviar Comentário</button>
      </form>
    </main>

    <div v-else-if="loading" class="loading-message">Carregando detalhes do livro...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import AdmSideBar from "@/components/adm_SideBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
    SideBar,
    AdmSideBar,
  },
  data() {
    return {
      sidebarOpen: false,
      book: null,
      comments: [],
      newComment: {
        name: '',
        text: '',
        rating: '',
      },
      loading: false,
      error: null,
      userRole: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : 'user',
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async fetchBookDetails() {
      this.loading = true;
      this.error = null;
      const bookId = this.$route.params.bookId;

      try {
        const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
        const data = response.data;

        this.book = {
          title: data.bookTitle,
          author: data.bookAuthor,
          year: data.publicationYear,
          genre: data.bookGenre,
          isbn: data.isbn || 'Não disponível',
          dbookDescription: data.dbookDescription || 'Não disponível',
          availableCopies: data.copiesAvailable,
          bookThumbnail: `http://localhost:3000/${data.bookThumbnail.replace(/\\/g, '/')}`,
          rating: data.averageRating || 0,
        };

        this.comments = data.comments || [];
      } catch (err) {
        this.error = "Erro ao carregar os detalhes do livro. Por favor, tente novamente.";
      } finally {
        this.loading = false;
      }
    },
    async reserveBook() {
      const bookId = this.$route.params.bookId;
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        alert("Você precisa estar autenticado para reservar um livro.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:3000/api/reservations/${bookId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        alert(response.data.message || "Livro reservado com sucesso!");
        this.fetchBookDetails();
      } catch (error) {
        console.error("Erro ao reservar o livro:", error.response?.data || error.message);
        alert(error.response?.data.error || "Erro ao reservar o livro. Tente novamente.");
      }
    },
    addToWishlist() {
      alert('Livro adicionado à Lista de Desejos!');
    },
    submitComment() {
      if (this.newComment.name && this.newComment.text && this.newComment.rating) {
        const comment = { 
          id: Date.now(), 
          user: this.newComment.name, 
          text: this.newComment.text, 
          rating: parseInt(this.newComment.rating) 
        };
        this.comments.push(comment);
        this.newComment = { name: '', text: '', rating: '' };
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    },
  },
  mounted() {
    this.fetchBookDetails();
  },
};
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

/* Seção de adicionar à lista de desejos */
.desejos-container {
    margin-top: 20px; /* Espaçamento acima da seção de desejos */
    padding: 15px; /* Espaçamento interno */
    background-color: #f9f9f9; /* Fundo da seção */
    border-radius: 8px; /* Bordas arredondadas */
    display: flex; /* Adiciona flexbox */
    justify-content: center; /* Centraliza os itens */
    align-items: center; /* Alinha verticalmente */
    gap: 10px; /* Espaço entre o texto e o botão */
}

.adicionar-desejos {
    background-color: #00334e; /* Cor do botão */
    color: white; /* Cor do texto */
    padding: 10px 20px; /* Espaçamento interno do botão */
    border: none; /* Remove a borda do botão */
    border-radius: 5px; /* Bordas arredondadas do botão */
    cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
}

.adicionar-desejos:hover {
    background-color: #005577; /* Cor do botão ao passar o mouse */
}
</style>
