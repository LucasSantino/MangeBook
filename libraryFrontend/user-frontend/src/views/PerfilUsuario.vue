<template>
    <div class="container">
      <NavBar @toggle-sidebar="toggleSidebar" />
      <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
  
      <main>
        <!-- Container das informações do usuário -->
        <div class="perfil-wrapper">
          <!-- Container da imagem de perfil -->
          <div class="perfil-container">
            <img src="/Site - MangeBook/imagens/perfil.png" alt="Imagem de Perfil" class="foto-perfil">
            <button>Alterar Imagem</button>
            <button>Editar Perfil</button>
            <button>Alterar Senha</button>
          </div>
  
          <div class="informacoes-container">
            <h2>Informações do Usuário</h2>
            <table class="informacoes-tabela">
              <tr>
                <td>ID do Usuário:</td>
                <td>123456</td>
              </tr>
              <tr>
                <td>Nome Completo:</td>
                <td>Nome do Usuário</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>email@exemplo.com</td>
              </tr>
              <tr>
                <td>Data de Nascimento:</td>
                <td>01/01/2000</td>
              </tr>
              <tr>
                <td>CPF:</td>
                <td>123.456.789-00</td>
              </tr>
              <tr>
                <td>Endereço:</td>
                <td>Rua Exemplo, 123</td>
              </tr>
              <tr>
                <td>Senha:</td>
                <td>********</td>
              </tr>
            </table>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import SideBar from '@/components/SideBar.vue';
  
  export default {
    components: {
      NavBar,
      SideBar,
    },
    data() {
      return {
        sidebarOpen: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Reset de estilo básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Estilos do container principal */
  main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 20px auto;
    width: 95%;
    max-width: 1200px;
  }
  
  .perfil-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 150px;
    margin-bottom: 150px;
    background-color: #f8f9fa;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    min-height: 400px;
    padding: 60px;
  }
  
  /* Estilo do container da imagem de perfil */
  .perfil-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    margin-top: 10px;
  }
  
  .foto-perfil {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    object-fit: cover;
  }
  
  .perfil-container button {
    width: 150px;
    height: 40px;
    margin: 5px 0;
    padding: 0;
    background-color: #00334e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  
  .perfil-container button:hover {
    background-color: #0052a3;
  }
  
  /* Estilo do container das informações do usuário */
  .informacoes-container {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .informacoes-tabela {
    width: 100%;
    border-collapse: collapse;
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .informacoes-tabela td {
    padding: 15px;
    font-size: 1rem;
    color: #333;
    border-bottom: 1px solid #d0d0d0;
  }
  
  .informacoes-tabela td:first-child {
    font-weight: bold;
    color: #00334e;
    text-align: left;
    width: 35%;
  }
  
  .informacoes-tabela td:last-child {
    text-align: left;
    color: #666;
    width: 65%;
  }
  </style>
  