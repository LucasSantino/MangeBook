<template>
  <div class="container">
    <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
    <NavBar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar Administrativa para administradores -->
    <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <main>
      <!-- Container das informações do usuário -->
      <div class="perfil-wrapper">
        <!-- Container da imagem de perfil -->
        <div class="perfil-container">
          <img src="/Site - MangeBook/imagens/perfil.png" alt="Imagem de Perfil" class="foto-perfil">
          
          <!-- Campo de Status -->
          <select v-model="status" class="status-select">
            <option value="Ativo">Ativo</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>
        </div>

        <div class="informacoes-container">
          <h2>Informações do Usuário</h2>
          <table class="informacoes-tabela">
            <tr>
              <td>ID do Usuário:</td>
              <td>123456</td>
            </tr>
            <tr>
              <td>Tipo de Usuário:</td>
              <td></td>
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
            <tr>
              <td>Status:</td>
              <td>{{ status }}</td> <!-- Exibe o status selecionado -->
            </tr>
          </table>

          <!-- Campo de notificação -->
          <div class="notificacao-container">
            <h3>Notificar Usuário</h3>
            <textarea v-model="notificacao" placeholder="Digite a notificação aqui..." rows="4"></textarea>
            <button @click="enviarNotificacao">Enviar Notificação</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import adm_SideBar from '@/components/adm_SideBar.vue'; // Importando corretamente a adm_SideBar

export default {
  components: {
    NavBar,
    adm_SideBar, // Usando a adm_SideBar no componente
  },
  data() {
    return {
      isSidebarOpen: false, // Controle do estado da sidebar
      notificacao: '',
      status: 'Ativo', // Valor inicial do select
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Alterna o estado da sidebar
    },
    enviarNotificacao() {
      alert("Notificação enviada com sucesso!");
      this.notificacao = ''; // Limpa o campo de notificação após o envio
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
    justify-content:center;
    align-items: flex-start;
    margin: 20px auto;
    width: 100%;
    max-width: 100%;
  }
  
  .perfil-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 130px; /* Aumentado o espaçamento superior em relação à navbar */
    margin-bottom: 20px;
    background-color: #f8f9fa;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    min-height: 400px;
    padding: 60px 40px; /* Aumentado o padding para mais espaçamento */
    flex-wrap: wrap;
    width: 50%; /* Largura reduzida para 80% */
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Estilo do container da imagem de perfil */
  .perfil-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0px; /* Reduzi a margem para aproximar do container das informações */
    margin-left: 80px;
    margin-top: 40px;
  }
  
  
  .foto-perfil {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    object-fit: cover;
  }
  
  /* Estilo do campo de status */
  .status-select {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #00334e;
    color: white;
  }
  
  
  /* Estilo do container das informações do usuário */
  .informacoes-container {
    display: flex;
    flex-direction: column;
    margin-left: 0px; /* Reduzi a margem para aproximar do container de perfil */
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    flex: 1;
  }
  /* Estilo do container das informações do usuário */
  .informacoes-container h2 {
    font-size: 1.75rem; /* Ajustado o tamanho do título */
    color: #00334e;
    margin-bottom: 20px; /* Ajustado o espaçamento inferior */
    margin-left: 60px; /* Aumentado o espaçamento à esquerda */
  }
  
  
  .informacoes-tabela {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .informacoes-tabela td {
    padding: 6px 10px;
    font-size: 0.85rem;
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
  
  /* Estilos para o campo de notificação */
  .notificacao-container {
    margin-top: 40px;
    width: 80%;
    margin: 0 auto;
  
  }
  
  .notificacao-container h3 {
    font-size: 1.5rem;
    color: #00334e;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
  .notificacao-container textarea {
    width: 100%;
    padding: 10px;
    font-size: 0.9rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    resize: none;
  }
  
  .notificacao-container button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #00334e;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .notificacao-container button:hover {
    background-color: #0052a3;
  }
  </style>
  