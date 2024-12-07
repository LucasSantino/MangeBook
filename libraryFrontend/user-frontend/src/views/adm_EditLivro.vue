<template>
  <div id="app">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main class="main-content">
      <div class="book-registration-container">
        <h1 class="title">Editar Informações do Livro</h1>
        <form @submit.prevent="submitForm">
          <div class="form-grid">
            <div class="form-left">
              <img :src="bookThumbnailUrl" alt="Capa do Livro" id="bookThumbnail" />
              <input type="file" id="imageUpload" accept="image/*" @change="previewImage" />
            </div>
            <div class="form-right">
              <div class="form-group">
                <label for="bookTitle">Título do Livro</label>
                <input
                  type="text"
                  v-model="bookTitle"
                  @blur="trimField('bookTitle')"
                  id="bookTitle"
                  required
                />
              </div>
              <div class="form-group">
                <label for="bookAuthor">Autor</label>
                <input
                  type="text"
                  v-model="bookAuthor"
                  @blur="trimField('bookAuthor')"
                  id="bookAuthor"
                  required
                />
              </div>
              <div class="form-group">
                <label for="publicationYear">Ano de Publicação</label>
                <input
                  type="number"
                  v-model="publicationYear"
                  id="publicationYear"
                  required
                />
              </div>
              <div class="form-group">
                <label for="bookGenre">Gênero</label>
                <input
                  type="text"
                  v-model="bookGenre"
                  id="bookGenre"
                  @blur="trimField('bookGenre')"
                  required
                />
              </div>
              <div class="form-group">
                <label for="isbn">ISBN</label>
                <input
                  type="text"
                  v-model="isbn"
                  id="isbn"
                  @blur="trimField('isbn')"
                  required
                />
              </div>
              <div class="form-group">
                <label for="copiesAvailable">Número de Cópias Disponíveis</label>
                <input
                  type="number"
                  v-model="copiesAvailable"
                  id="copiesAvailable"
                  required
                />
              </div>
              <div class="form-group">
                <label for="bookDescription">Descrição</label>
                <textarea
                  v-model="dbookDescription"
                  id="bookDescription"
                  rows="5"
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

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Livro Atualizado com Sucesso!</h2>
        <button @click="closeModal" class="modal-close-btn">Fechar</button>
      </div>
    </div>
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
      bookId: this.$route.params.id,
      bookThumbnailUrl: "https://via.placeholder.com/200x300",
      bookTitle: "",
      bookAuthor: "",
      publicationYear: "",
      bookGenre: "",
      isbn: "",
      copiesAvailable: "",
      dbookDescription: "", // Agora usa o campo correto do backend
      isSidebarOpen: false,
      showModal: false,
      selectedImage: null,
    };
  },
  mounted() {
    this.carregarLivro();
  },
  computed: {
    remainingCharacters() {
      return 630 - this.dbookDescription.length;
    },
  },
  methods: {
    async carregarLivro() {
      try {
        const { data: book } = await axios.get(`http://localhost:3000/api/books/${this.bookId}`);
        Object.assign(this, book);
        this.bookThumbnailUrl = book.bookThumbnail
          ? `http://localhost:3000/${book.bookThumbnail}`
          : this.bookThumbnailUrl;
      } catch (error) {
        console.error("Erro ao carregar informações do livro:", error.message);
        alert("Erro ao carregar o livro.");
      }
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Imagem muito grande! Limite de 5MB.");
          return;
        }
        this.bookThumbnailUrl = URL.createObjectURL(file);
        this.selectedImage = file;
      }
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append("bookTitle", this.bookTitle);
        formData.append("bookAuthor", this.bookAuthor);
        formData.append("publicationYear", this.publicationYear);
        formData.append("bookGenre", this.bookGenre);
        formData.append("isbn", this.isbn);
        formData.append("copiesAvailable", this.copiesAvailable);
        formData.append("dbookDescription", this.dbookDescription); // Usa o campo correto
        if (this.selectedImage) {
          formData.append("bookThumbnail", this.selectedImage);
        }

        await axios.put(`http://localhost:3000/api/books/${this.bookId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.showModal = true;
        this.resetForm();
      } catch (error) {
        console.error("Erro ao atualizar livro:", error.response?.data || error.message);
        alert("Erro ao atualizar o livro.");
      }
    },
    resetForm() {
      this.bookThumbnailUrl = "https://via.placeholder.com/200x300";
      this.bookTitle = "";
      this.bookAuthor = "";
      this.publicationYear = "";
      this.bookGenre = "";
      this.isbn = "";
      this.copiesAvailable = "";
      this.dbookDescription = ""; // Reseta o campo correto
      this.selectedImage = null;
    },
    trimField(field) {
      this[field] = this[field].trim();
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