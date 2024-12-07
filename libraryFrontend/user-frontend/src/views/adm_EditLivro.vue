<template>
  <div id="app">
    <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
    <NavBar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar Administrativa para administradores -->
    <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <main class="main-content">
      <!-- Formulário de Edição de Livro -->
      <div class="book-registration-container">
        <h1 class="title">Editar Informações do Livro</h1>
        <form @submit.prevent="submitForm">
          <div class="form-grid">
            <div class="form-left">
              <img :src="bookThumbnail" alt="Capa do Livro" id="bookThumbnail" />
              <input type="file" id="imageUpload" accept="image/*" @change="previewImage" />
            </div>
            <div class="form-right">
              <div class="form-group">
                <label for="bookTitle">Título do Livro</label>
                <input
                  type="text"
                  v-model="bookTitle"
                  id="bookTitle"
                  name="bookTitle"
                  placeholder="Insira o título do livro"
                  required
                />
              </div>
              <div class="form-group">
                <label for="bookAuthor">Autor</label>
                <input
                  type="text"
                  v-model="bookAuthor"
                  id="bookAuthor"
                  name="bookAuthor"
                  placeholder="Nome do autor"
                  required
                />
              </div>
              <div class="form-group">
                <label for="publicationYear">Ano de Publicação</label>
                <input
                  type="number"
                  v-model="publicationYear"
                  id="publicationYear"
                  name="publicationYear"
                  placeholder="Exemplo: 2024"
                  required
                />
              </div>
              <div class="form-group">
                <label for="bookGenre">Gênero</label>
                <input
                  type="text"
                  v-model="bookGenre"
                  id="bookGenre"
                  name="bookGenre"
                  placeholder="Gênero do livro"
                  required
                />
              </div>
              <div class="form-group">
                <label for="isbn">ISBN</label>
                <input
                  type="text"
                  v-model="isbn"
                  id="isbn"
                  name="isbn"
                  placeholder="Exemplo: 978-3-16-148410-0"
                  required
                />
              </div>
              <div class="form-group">
                <label for="copiesAvailable">Número de Cópias Disponíveis</label>
                <input
                  type="number"
                  v-model="copiesAvailable"
                  id="copiesAvailable"
                  name="copiesAvailable"
                  placeholder="Quantidade de cópias"
                  required
                />
              </div>
              <div class="form-group">
                <label for="bookDescription">Descrição</label>
                <textarea
                  v-model="bookDescription"
                  id="bookDescription"
                  name="bookDescription"
                  rows="5"
                  placeholder="Descreva o livro, seus personagens e história"
                  maxlength="630"
                  required
                ></textarea>
                <p class="char-count">{{ remainingCharacters }} caracteres restantes</p>
              </div>
            </div>
          </div>
          <button type="submit" class="submit-btn">Salvar Alterações</button>
        </form>
      </div>
    </main>

    <!-- Modal de Sucesso -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Livro Atualizado com Sucesso!</h2>
        <button @click="closeModal" class="modal-close-btn">Fechar</button>
      </div>
    </div>

    <!-- Rodapé -->
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import adm_SideBar from "@/components/adm_SideBar.vue";

export default {
  components: {
    NavBar,
    adm_SideBar,
  },
  data() {
    return {
      bookId: this.$route.params.id, // ID do livro recebido na rota
      bookThumbnailUrl: null, // URL para pré-visualização da imagem
      bookTitle: "",
      bookAuthor: "",
      publicationYear: "",
      bookGenre: "",
      isbn: "",
      copiesAvailable: "",
      bookDescription: "",
      isSidebarOpen: false, // Controle do estado da sidebar
      showModal: false, // Controle da exibição do modal
      selectedImage: null, // Para armazenar o arquivo da imagem selecionada
    };
  },
  mounted() {
    this.carregarLivro();
  },
  methods: {
    // Carregar os dados do livro
    async carregarLivro() {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${this.bookId}`);
        const book = response.data;

        // Preenche os campos com os dados retornados
        this.bookThumbnailUrl = book.bookThumbnail
          ? `http://localhost:3000/${book.bookThumbnail}`
          : "https://via.placeholder.com/200x300";
        this.bookTitle = book.bookTitle || "";
        this.bookAuthor = book.bookAuthor || "";
        this.publicationYear = book.publicationYear || "";
        this.bookGenre = book.bookGenre || "";
        this.isbn = book.isbn || "";
        this.copiesAvailable = book.copiesAvailable || "";
        this.bookDescription = book.dbookDescription || ""; // Certifica-se de usar o campo correto do backend
      } catch (error) {
        console.error("Erro ao carregar informações do livro:", error);
        alert("Erro ao carregar as informações do livro.");
      }
    },

    // Pré-visualização da imagem
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // Valida se o tamanho do arquivo excede 5MB
          alert("A imagem é muito grande. O tamanho máximo permitido é 5MB.");
          return;
        }
        this.bookThumbnailUrl = URL.createObjectURL(file); // Atualiza a visualização da imagem
        this.selectedImage = file; // Armazena o arquivo da imagem para envio
      }
    },

    // Função para enviar o formulário
    async submitForm() {
      if (!this.bookTitle || !this.bookAuthor || !this.publicationYear || !this.bookGenre || !this.isbn || !this.copiesAvailable) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const formData = new FormData();
      formData.append("bookTitle", this.bookTitle);
      formData.append("bookAuthor", this.bookAuthor);
      formData.append("publicationYear", this.publicationYear);
      formData.append("bookGenre", this.bookGenre);
      formData.append("isbn", this.isbn);
      formData.append("copiesAvailable", this.copiesAvailable);
      formData.append("dbookDescription", this.bookDescription); // Usa o campo correto para descrição

      // Adiciona a imagem apenas se o usuário selecionou uma nova
      if (this.selectedImage) {
        formData.append("bookThumbnail", this.selectedImage);
      }

      try {
        const response = await axios.put(
          `http://localhost:3000/api/books/${this.bookId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Livro atualizado:", response.data);

        // Exibe o modal de sucesso
        this.showModal = true;

        // Limpa a imagem armazenada localmente
        URL.revokeObjectURL(this.bookThumbnailUrl);
        this.resetForm();
      } catch (error) {
        console.error("Erro ao atualizar livro:", error.response?.data || error.message);
        alert("Erro ao atualizar o livro. Verifique os dados e tente novamente.");
      }
    },

    // Resetar o formulário
    resetForm() {
      this.bookThumbnailUrl = "https://via.placeholder.com/200x300";
      this.bookTitle = "";
      this.bookAuthor = "";
      this.publicationYear = "";
      this.bookGenre = "";
      this.isbn = "";
      this.copiesAvailable = "";
      this.bookDescription = "";
      this.selectedImage = null;
    },

    closeModal() {
      this.showModal = false;
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>


  <style scoped>
  /* CSS fornecido por você */
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }
  
  .book-registration-container {
    max-width: 900px;
    margin: 130px auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #00334e;
  }
  
  .form-grid {
    display: flex;
    gap: 20px;
  }
  
  .form-left {
    flex: 1;
    text-align: center;
  }
  
  .form-left img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .form-left input[type="file"] {
    display: block;
    margin: 10px auto;
    padding: 5px;
  }
  
  .form-right {
    flex: 2;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  textarea {
    resize: none;
    min-height: 100px;
  }
  
  .submit-btn {
    display: block;
    width: 100%;
    background-color: #00334e;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  .modal-close-btn {
    background-color: #00334e;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .modal-close-btn:hover {
    background-color: #0056b3;
  }
  
  .char-count {
    font-size: 12px;
    color: #777;
    margin-top: 5px;
  }
  
  @media (max-width: 768px) {
    .form-grid {
      flex-direction: column;
    }
  
    .form-left {
      margin-bottom: 20px;
    }
  }
  </style>