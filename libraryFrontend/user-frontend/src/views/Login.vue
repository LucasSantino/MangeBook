<template>
    <div class="login-container">
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
  export default {
    data() {
      return {
        userType: '',
        username: '',
        password: ''
      };
    },
    methods: {
      handleSubmit() {
        if (this.username && this.password) {
          // Lógica para processar o login
        } else {
          // Lógica para exibir mensagem de erro
        }
      }
    }
  };
  </script>
  
  <style scoped>
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
  