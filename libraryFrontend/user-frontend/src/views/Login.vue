<template>
  <div class="login-container">
    <NavBar />
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Bem-vindo ao sistema MangeBook</h2>
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input type="text" id="username" placeholder="Digite seu usuário" required v-model="username">
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" placeholder="Digite sua senha" required v-model="password">
      </div>
      <!-- Botão para enviar o formulário -->
      <button type="submit" class="login-button">Entrar</button>
      <p class="forgot-password">
        <a href="RecuperaSenha.html">Esqueceu sua senha?</a>
      </p>
    </form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      username: '', // Nome de usuário
      password: '', // Senha
    };
  },
  methods: {
    handleSubmit() {
      // Definir as credenciais válidas para administrador e usuário comum
      const validUsernameAdmin = 'admin'; // Nome de usuário do administrador
      const validPasswordAdmin = 'senha123'; // Senha do administrador

      const validUsernameUser = 'user'; // Nome de usuário do usuário comum
      const validPasswordUser = 'senha123'; // Senha do usuário comum

      // Lógica para autenticação
      if (this.username === validUsernameAdmin && this.password === validPasswordAdmin) {
        // Salva os dados no localStorage (token e informações do usuário)
        localStorage.setItem('token', 'admin-token');
        localStorage.setItem('user', JSON.stringify({
          username: this.username,
          userType: 'admin', // Definindo tipo como admin
        }));

        // Redireciona para a página de administrador
        this.$router.push('/adm_dashboard');  
        alert('Login bem-sucedido como Administrador!');
      } else if (this.username === validUsernameUser && this.password === validPasswordUser) {
        // Salva os dados no localStorage (token e informações do usuário)
        localStorage.setItem('token', 'user-token');
        localStorage.setItem('user', JSON.stringify({
          username: this.username,
          userType: 'user', // Definindo tipo como user
        }));

        // Redireciona para a página de usuário
        this.$router.push('/index');  
        alert('Login bem-sucedido como Usuário Comum!');
      } else {
        // Exibe um alerta caso as credenciais estejam incorretas
        alert('Usuário ou senha incorretos!');
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

input[type="text"],
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
</style>
