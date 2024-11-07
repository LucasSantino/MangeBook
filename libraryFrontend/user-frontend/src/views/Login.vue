<template>
  <div class="login-container">
    <!-- Aqui você usa o NavBar importado -->
    <NavBar />
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Bem-vindo ao sistema MangeBook</h2>
      <div class="form-group">
        <label for="user-type">Tipo de Usuário:</label>
        <select id="user-type" name="user-type" required v-model="userType">
          <option value="" disabled selected>Selecione um tipo de usuário</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuário Comum</option>
        </select>
      </div>
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input type="text" id="username" placeholder="Digite seu usuário" required v-model="username">
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" placeholder="Digite sua senha" required v-model="password">
      </div>
      <button type="button" class="login-button" @click="handleSubmit">Entrar</button>
      <p class="forgot-password">
        <a href="RecuperaSenha.html">Esqueceu sua senha?</a>
      </p>
    </form>
  </div>
</template>

<script>
// Importação do componente NavBar
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userType: '', // Tipo de usuário (admin ou user)
      username: '', // Nome de usuário
      password: ''  // Senha
    };
  },
  methods: {
    handleSubmit() {
      const validUsernameAdmin = 'admin';  // Nome de usuário do administrador
      const validPasswordAdmin = 'senha123'; // Senha do administrador

      const validUsernameUser = 'user';  // Nome de usuário do usuário comum
      const validPasswordUser = 'senha123'; // Senha do usuário comum

      // Lógica para autenticação
      if (this.userType === 'admin' && this.username === validUsernameAdmin && this.password === validPasswordAdmin) {
        // Se o usuário for administrador e a autenticação for bem-sucedida
        localStorage.setItem('user', JSON.stringify({
          username: this.username,
          userType: this.userType,
          isAuthenticated: true
        }));

        // Redireciona para a página do administrador
        this.$router.push('/admin');
        alert('Login bem-sucedido como Administrador!');
      } else if (this.userType === 'user' && this.username === validUsernameUser && this.password === validPasswordUser) {
        // Se o usuário for comum e a autenticação for bem-sucedida
        localStorage.setItem('user', JSON.stringify({
          username: this.username,
          userType: this.userType,
          isAuthenticated: true
        }));

        // Redireciona para a página do usuário comum
        this.$router.push('/user');
        alert('Login bem-sucedido como Usuário Comum!');
      } else {
        // Caso as credenciais estejam erradas
        alert('Usuário, senha ou tipo de usuário incorretos!');
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
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
select {
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

.footer {
  background-color: #00334e;
  color: white;
  text-align: center;
  padding: 10px;
  position: relative;
  width: 100%;
  margin-top: auto;
}
</style>
