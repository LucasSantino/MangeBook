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
import NavBar from "@/components/NavBar.vue";
import adm_SideBar from "@/components/adm_SideBar.vue";

export default {
  components: {
    NavBar,
    adm_SideBar,
  },
  props: {
    book: {
      type: Object,
      default: () => ({
        title: "",
        author: "",
        year: "",
        genre: "",
        isbn: "",
        copies: "",
        description: "",
        thumbnail: "https://via.placeholder.com/200x300",
      }),
    },
  },
  data() {
    return {
      bookThumbnail: this.book.thumbnail,
      bookTitle: this.book.title,
      bookAuthor: this.book.author,
      publicationYear: this.book.year,
      bookGenre: this.book.genre,
      isbn: this.book.isbn,
      copiesAvailable: this.book.copies,
      bookDescription: this.book.description,
      isSidebarOpen: false,
      showModal: false,
    };
  },
  computed: {
    remainingCharacters() {
      const maxLength = 630;
      return maxLength - (this.bookDescription?.length || 0);
    },
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.bookThumbnail = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    submitForm() {
      if (!this.bookThumbnail || this.bookThumbnail === "https://via.placeholder.com/200x300") {
        alert("Por favor, insira uma imagem para o livro.");
        return;
      }
      console.log("Formulário atualizado com sucesso", {
        bookTitle: this.bookTitle,
        bookAuthor: this.bookAuthor,
        publicationYear: this.publicationYear,
        bookGenre: this.bookGenre,
        isbn: this.isbn,
        copiesAvailable: this.copiesAvailable,
        bookDescription: this.bookDescription,
        bookThumbnail: this.bookThumbnail,
      });
      this.showModal = true;
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