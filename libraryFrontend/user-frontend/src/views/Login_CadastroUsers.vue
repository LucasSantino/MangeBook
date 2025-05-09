<template>
  <div id="app">
      <NavBar :isEnabled="false" />

      <main class="main-content">
          <div class="book-registration-container">
              <h1 class="title">Cadastro de Usuário</h1>
              <form @submit.prevent="submitForm" enctype="multipart/form-data">
                  <div class="form-grid">
                      <div class="form-left">
                          <img :src="userThumbnail" alt="Foto do Usuário" id="userThumbnail">
                          <input type="file" ref="imageUpload" accept="image/*" @change="previewImage">
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

          <div v-if="showModal" class="modal-overlay">
              <div class="modal-content">
                  <p>Usuário cadastrado com sucesso!</p>
                  <button @click="closeModal">Fechar</button>
              </div>
          </div>
      </main>

      <Footer />
  </div>
</template>

<script>
import axios from 'axios';
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
      confirmPassword: "",
      showModal: false,
      responseMessage: "",
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
        this.password === this.confirmPassword // Senhas devem coincidir
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
    async submitForm() {
  if (!this.isFormValid) return; // Verifica se o formulário está válido

  const formData = new FormData();
  formData.append("username", this.fullName.split(' ')[0]); // Usa o primeiro nome como username
  formData.append("birthDate", this.birthDate);
  formData.append("gender", this.gender);
  formData.append("cpf", this.cpf);
  formData.append("address", this.address);
  formData.append("email", this.email);
  formData.append("password", this.password);
  formData.append("confirmPassword", this.confirmPassword);

  // Verifica se o arquivo de imagem foi selecionado
  const imageUpload = this.$refs.imageUpload?.files[0]; // Certifique-se de que a referência está configurada corretamente
  if (imageUpload) {
    formData.append("userThumbnail", imageUpload); // Anexa o arquivo de imagem ao FormData
  }

  try {
    // Envia a requisição para o backend
    const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Exibe o valor da resposta no console (usa a variável para evitar o erro do ESLint)
    console.log("Resposta do servidor:", response);

    // Define uma mensagem de sucesso fixa
    this.responseMessage = "Cadastro Realizado com sucesso";
    this.showModal = true;

    // Redireciona para a página de login após o cadastro
    this.$router.push({ name: 'Login' });
  } catch (error) {
    // Exibe a mensagem de erro caso ocorra algum problema
    this.responseMessage = error.response?.data?.message || 'Erro desconhecido';
    this.showModal = true; // Exibe o modal de erro
  }
}
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
  