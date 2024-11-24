<template>
    <div id="app">
      <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
      <NavBar :isEnabled="false" /> <!-- Passa a flag 'false' para desabilitar as funções da navbar -->
  
      <main class="main-content">
        <!-- Novo Formulário de Cadastro de Usuário -->
        <div class="book-registration-container">
          <h1 class="title">Cadastro de Usuário</h1>
          <form @submit.prevent="submitForm">
            <div class="form-grid">
              <div class="form-left">
                <!-- Foto do usuário (opcional) -->
                <img :src="userThumbnail" alt="Foto do Usuário" id="userThumbnail">
                <input type="file" id="imageUpload" accept="image/*" @change="previewImage">
              </div>
              <div class="form-right">
                <div class="form-group">
                  <label for="fullName">Nome Completo</label>
                  <input type="text" v-model="fullName" id="fullName" name="fullName" placeholder="Insira o nome completo" required>
                </div>
                <div class="form-group">
                  <label for="birthDate">Data de Nascimento</label>
                  <input type="date" v-model="birthDate" id="birthDate" name="birthDate" required>
                </div>
                <div class="form-group">
                  <label for="gender">Gênero</label>
                  <select v-model="gender" id="gender" name="gender" required>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="cpf">CPF</label>
                  <input type="text" v-model="cpf" id="cpf" name="cpf" placeholder="Insira o CPF" required>
                </div>
                <div class="form-group">
                  <label for="address">Endereço</label>
                  <input type="text" v-model="address" id="address" name="address" placeholder="Insira o endereço" required>
                </div>
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input type="email" v-model="email" id="email" name="email" placeholder="Insira o e-mail" required>
                </div>
                <div class="form-group">
                  <label for="password">Senha</label>
                  <input type="password" v-model="password" id="password" name="password" placeholder="Insira a senha" required>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirmar Senha</label>
                  <input type="password" v-model="confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirme a senha" required>
                </div>
                <div v-if="password && confirmPassword && password !== confirmPassword" class="error-message">
                  <small>As senhas não coincidem.</small>
                </div>
              </div>
            </div>
            <button type="submit" class="submit-btn" :disabled="!isFormValid">Finalizar Cadastro</button>
          </form>
        </div>
  
        <!-- Modal de Sucesso -->
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
            <p>Usuário cadastrado com sucesso!</p>
            <button @click="closeModal">Fechar</button>
          </div>
        </div>
      </main>
  
      <!-- Rodapé -->
      <Footer />
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    components: {
      NavBar,
    },
    data() {
      return {
        userThumbnail: "https://via.placeholder.com/200", // Imagem padrão
        fullName: "",
        birthDate: "",
        gender: "masculino",
        cpf: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "", // Campo para confirmar a senha
        showModal: false, // Controle da exibição do modal
      };
    },
    computed: {
      isFormValid() {
        return (
          this.fullName &&
          this.birthDate &&
          this.cpf &&
          this.address &&
          this.email &&
          this.password &&
          this.confirmPassword &&
          this.password === this.confirmPassword &&
          this.userThumbnail !== "https://via.placeholder.com/200"
        );
      },
    },
    methods: {
      previewImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.userThumbnail = reader.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitForm() {
        if (!this.isFormValid) return;
  
        console.log("Formulário de Cadastro de Usuário enviado", {
          fullName: this.fullName,
          birthDate: this.birthDate,
          gender: this.gender,
          cpf: this.cpf,
          address: this.address,
          email: this.email,
          password: this.password,
        });
  
        // Exibir o modal de sucesso
        this.showModal = true;
  
        // Redirecionar para a página /index após o sucesso
        this.$router.push('/index');
      },
      closeModal() {
        this.showModal = false;
      },
    },
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
  
  /* Container de registro */
  .book-registration-container {
    max-width: 800px; /* Diminui a largura */
    margin: 30px auto; /* Diminui a margem superior */
    background: #fff;
    padding: 10px; /* Diminui o padding interno */
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 130px; /* Diminui a margem superior */
    margin-bottom: 170px;
  }
  
  /* Título */
  .title {
    font-size: 20px; /* Diminui o tamanho do título */
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px; /* Diminui o espaçamento inferior */
    color: #00334e;
  }
  
  /* Formulário em grid */
  .form-grid {
    display: flex;
    gap: 10px; /* Diminui o espaçamento entre as colunas */
  }
  
  .form-left {
    flex: 1;
    text-align: center;
  }
  
  .form-left img {
    max-width: 70%; /* Diminui o tamanho da imagem */
    height: auto;
    border-radius: 50%;
    margin-bottom: 8px;
  }
  
  .form-left input[type="file"] {
    display: block;
    margin: 6px auto; /* Diminui o espaçamento do input */
  }
  
  .form-right {
    flex: 2;
  }
  
  .form-group {
    margin-bottom: 10px; /* Diminui o espaçamento inferior */
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 4px; /* Diminui o espaçamento inferior */
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 6px; /* Diminui o padding interno */
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px; /* Diminui o tamanho da fonte */
  }
  
  /* Botão de envio */
  .submit-btn {
    display: block;
    width: 100%;
    background-color: #00334e;
    color: white;
    padding: 6px 10px; /* Diminui o padding interno */
    border: none;
    border-radius: 5px;
    font-size: 14px; /* Diminui o tamanho da fonte */
    cursor: pointer;
    margin-top: 10px; /* Diminui o espaço superior */
  }
  
  .submit-btn:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
  
  /* Modal de Sucesso */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  