<template>
  <div class="login-container">
    <NavBar />
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Bem-vindo ao sistema MangeBook</h2>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" placeholder="Digite seu e-mail" required v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" placeholder="Digite sua senha" required v-model="password">
      </div>
      <!-- Botão para enviar o formulário -->
      <button type="submit" class="login-button">Entrar</button>
      <!-- Novo link "Cadastre-se" abaixo do botão de login -->
      <p class="signup-option">
        Não tem uma conta? <router-link to="/login_cadastrousers">Cadastre-se</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      email: '', // E-mail do usuário
      password: '', // Senha do usuário
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Envia a requisição para o backend com o email e senha
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        // Verifica se a resposta contém um token (sucesso no login)
        if (response.status === 200 && response.data.token) {
          const user = response.data.user; // Usuário retornado do backend
          
          // Salva o token e as informações do usuário no localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(user));

          // LOG DE DEPURAÇÃO
          console.log('User info from backend:', user); // Log para depuração

          // Salva o ID do usuário separadamente
          localStorage.setItem('userId', user._id); // Armazena o ID do usuário separadamente
          console.log('userId armazenado no localStorage:', user._id); // Log para depuração

          // Redireciona para a página do usuário (baseado no role)
          if (user.role === 'admin') {
            this.$router.push('/adm_userslista');  
            alert('Login bem-sucedido como Administrador!');
          } else {
            this.$router.push('/index');
            alert('Login bem-sucedido como Usuário Comum!');
          }
        }
      } catch (error) {
        console.error(error);
        alert('Erro ao realizar o login. Verifique suas credenciais.');
      }
    }
  }
};
</script>


<style scoped>
/* Estilos do formulário de login */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 140px);
  flex-direction: column;
  margin-bottom: 70px; /* Adicionando margem inferior para aumentar o espaçamento do footer */
}

.login-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.login-form h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #00334e;
  border-radius: 5px;
}

.login-button {
  background-color: #00334e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.login-button:hover {
  background-color: #004c66;
}

.forgot-password {
  margin-top: 10px;
  text-align: center;
}

.forgot-password a {
  color: #00334e;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.signup-option {
  text-align: center;
  margin-top: 15px;
}

.signup-option a {
  color: #00334e;
  text-decoration: none;
}

.signup-option a:hover {
  text-decoration: underline;
}
</style>

