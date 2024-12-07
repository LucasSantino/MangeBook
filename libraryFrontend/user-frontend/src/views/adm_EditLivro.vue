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
      bookThumbnail: null,
      bookTitle: "",
      bookAuthor: "",
      publicationYear: "",
      bookGenre: "",
      isbn: "",
      copiesAvailable: "",
      bookDescription: "",
      isSidebarOpen: false,
      showModal: false,
    };
  },
  mounted() {
    this.carregarLivro();
  },
  methods: {
    async carregarLivro() {
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${this.bookId}`);
        const book = response.data;

        // Preenche os campos com os dados retornados
        this.bookThumbnail = book.bookThumbnail
          ? `http://localhost:3000/${book.bookThumbnail}`
          : "https://via.placeholder.com/200x300";
        this.bookTitle = book.bookTitle || "";
        this.bookAuthor = book.bookAuthor || "";
        this.publicationYear = book.publicationYear || "";
        this.bookGenre = book.bookGenre || "";
        this.isbn = book.isbn || "";
        this.copiesAvailable = book.copiesAvailable || "";
        this.bookDescription = book.dbookDescription || "";
      } catch (error) {
        console.error("Erro ao carregar informações do livro:", error);
        alert("Erro ao carregar as informações do livro.");
      }
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.bookThumbnail = reader.result; // Atualiza a imagem para exibição
        };
        reader.readAsDataURL(file);
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
        formData.append("dbookDescription", this.bookDescription);

        const imageInput = this.$refs.imageUpload;

        // Se o usuário escolheu uma nova imagem, envia a imagem nova
        if (imageInput && imageInput.files[0]) {
          formData.append("bookThumbnail", imageInput.files[0]);
        } else if (this.bookThumbnail && !this.bookThumbnail.startsWith("data:")) {
          // Caso contrário, envia a imagem já existente no banco (se for uma URL)
          formData.append("bookThumbnail", this.bookThumbnail.replace("http://localhost:3000/", ""));
        } else if (this.bookThumbnail && this.bookThumbnail.startsWith("data:")) {
          // Se for uma imagem em base64 (gerada pelo preview), envia também
          formData.append("bookThumbnail", this.bookThumbnail);
        }

        const response = await axios.put(`http://localhost:3000/api/books/${this.bookId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.showModal = true; // Exibe o modal de sucesso
        console.log("Livro atualizado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao atualizar livro:", error);
        alert("Erro ao atualizar o livro. Verifique os campos preenchidos.");
      }
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