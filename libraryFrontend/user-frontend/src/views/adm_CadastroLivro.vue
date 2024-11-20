<template>
  <div id="app">
    <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
    <NavBar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar Administrativa para administradores -->
    <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <main class="main-content">
      <!-- Novo Formulário de Cadastro de Livro -->
      <div class="book-registration-container">
        <h1 class="title">Cadastro de Livro</h1>
        <form @submit.prevent="submitForm">
          <div class="form-grid">
            <div class="form-left">
              <img :src="bookThumbnail" alt="Capa do Livro" id="bookThumbnail">
              <input type="file" id="imageUpload" accept="image/*" @change="previewImage">
            </div>
            <div class="form-right">
              <div class="form-group">
                <label for="bookId">ID do Livro</label>
                <input type="text" v-model="bookId" id="bookId" name="bookId" placeholder="Insira o ID do livro" required>
              </div>
              <div class="form-group">
                <label for="bookTitle">Título do Livro</label>
                <input type="text" v-model="bookTitle" id="bookTitle" name="bookTitle" placeholder="Insira o título do livro" required>
              </div>
              <div class="form-group">
                <label for="bookAuthor">Autor</label>
                <input type="text" v-model="bookAuthor" id="bookAuthor" name="bookAuthor" placeholder="Nome do autor" required>
              </div>
              <div class="form-group">
                <label for="publicationYear">Ano de Publicação</label>
                <input type="number" v-model="publicationYear" id="publicationYear" name="publicationYear" placeholder="Exemplo: 2024" required>
              </div>
              <div class="form-group">
                <label for="bookGenre">Gênero</label>
                <input type="text" v-model="bookGenre" id="bookGenre" name="bookGenre" placeholder="Gênero do livro" required>
              </div>
              <div class="form-group">
                <label for="isbn">ISBN</label>
                <input type="text" v-model="isbn" id="isbn" name="isbn" placeholder="Exemplo: 978-3-16-148410-0" required>
              </div>
              <div class="form-group">
                <label for="copiesAvailable">Número de Cópias Disponíveis</label>
                <input type="number" v-model="copiesAvailable" id="copiesAvailable" name="copiesAvailable" placeholder="Quantidade de cópias" required>
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
                  required>
                </textarea>
                <p class="char-count">{{ remainingCharacters }} caracteres restantes</p>
              </div>
            </div>
          </div>
          <button type="submit" class="submit-btn">Cadastrar Livro</button>
        </form>
      </div>
    </main>

    <!-- Modal de Sucesso -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Livro Cadastrado com Sucesso!</h2>
        <button @click="closeModal" class="modal-close-btn">Fechar</button>
      </div>
    </div>

    <!-- Rodapé -->
    <Footer />
  </div>
</template>

<script>
// Importação dos componentes necessários
import NavBar from '@/components/NavBar.vue';
import adm_SideBar from '@/components/adm_SideBar.vue';


export default {
  components: {
    NavBar,
    adm_SideBar,
   
  },
  data() {
    return {
      bookThumbnail: "https://via.placeholder.com/200x300",
      bookId: "",
      bookTitle: "",
      bookAuthor: "",
      publicationYear: "",
      bookGenre: "",
      isbn: "",
      copiesAvailable: "",
      bookDescription: "",
      isSidebarOpen: false,  // Controle do estado da sidebar
      showModal: false,      // Controle da exibição do modal
    };
  },
  computed: {
    // Computed property para calcular os caracteres restantes
    remainingCharacters() {
      const maxLength = 630;
      return maxLength - this.bookDescription.length;
    }
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
  // Verificar se o campo de imagem foi preenchido
  if (!this.bookThumbnail || this.bookThumbnail === "https://via.placeholder.com/200x300") {
    alert("Por favor, insira uma imagem para o livro.");
    return; // Impede o envio do formulário
  }

  // Lógica para enviar o formulário (exibição do modal)
  console.log('Formulário enviado', {
    bookId: this.bookId,
    bookTitle: this.bookTitle,
    bookAuthor: this.bookAuthor,
    publicationYear: this.publicationYear,
    bookGenre: this.bookGenre,
    isbn: this.isbn,
    copiesAvailable: this.copiesAvailable,
    bookDescription: this.bookDescription
  });

  // Exibir o modal de sucesso
  this.showModal = true;
},
    closeModal() {
      // Fechar o modal
      this.showModal = false;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
/* Estilos gerais */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

/* Container de registro de livro */
.book-registration-container {
  max-width: 900px;
  margin: 130px auto; /* Aumentado o espaçamento superior e inferior para dar mais espaço */
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Título */
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #00334e;
}

/* Grid para o formulário */
.form-grid {
  display: flex;
  gap: 20px;
}

/* Coluna esquerda para a miniatura */
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

/* Input de arquivo para a imagem */
.form-left input[type="file"] {
  display: block;
  margin: 10px auto;
  padding: 5px;
}

/* Coluna direita com os campos de entrada */
.form-right {
  flex: 2;
}

/* Estilo dos grupos de campos */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left; /* Alinhamento à esquerda para os títulos dos campos */
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* Estilo do campo de descrição */
.form-group textarea {
  resize: none;
  min-height: 100px;
}

/* Botão de envio */
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

/* Estilos do Modal */
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

/* Estilo para o contador de caracteres restantes */
.char-count {
  font-size: 12px;
  color: #777;
  margin-top: 5px;
}

/* Ajustes para responsividade */
@media (max-width: 768px) {
  .form-grid {
    flex-direction: column;
  }

  .form-left {
    margin-bottom: 20px;
  }
}
</style>
