<template>
  <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <main>
      <!-- Container das informações do usuário -->
      <div class="perfil-wrapper">
        <!-- Container da imagem de perfil -->
        <div class="perfil-container">
          <img 
            :src="getProfileImage(user.userThumbnail)" 
            alt="Imagem de Perfil" 
            class="foto-perfil">
          <!-- Botão de Editar Perfil com navegação -->
          <button @click="editProfile">Editar Perfil</button>
        </div>

        <div class="informacoes-container">
          <h2>Informações do Usuário</h2>
          <table class="informacoes-tabela">
            <tr>
              <td>ID do Usuário:</td>
              <td>{{ user._id || 'Carregando...' }}</td>
            </tr>
            <tr>
              <td>Nome Completo:</td>
              <td>{{ user.username || 'Carregando...' }}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{{ user.email || 'Carregando...' }}</td>
            </tr>
            <tr>
              <td>Data de Nascimento:</td>
              <td>{{ formatBirthDate(user.birthDate) || 'Carregando...' }}</td>
            </tr>
            <tr>
              <td>CPF:</td>
              <td>{{ user.cpf || 'Carregando...' }}</td>
            </tr>
            <tr>
              <td>Endereço:</td>
              <td>{{ user.address || 'Carregando...' }}</td>
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
import axios from 'axios';
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
      user: {}, // Dados do usuário
      email: '', // E-mail do usuário
      password: '', // Senha do usuário
    };
  },
  mounted() {
    this.fetchUserData(); // Busca os dados do usuário quando o componente é montado
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    editProfile() {
      this.$router.push({ name: 'EditPerfil' });
    },
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
        const token = localStorage.getItem('token'); // Obtém o token de autenticação do localStorage

        console.log('ID do usuário:', userId);
        console.log('Token de autenticação:', token);

        if (!userId || !token) {
          console.error('ID ou Token não encontrados no localStorage.');
          alert('Por favor, faça login novamente.');
          this.$router.push('/login'); // Redireciona para a página de login
          return;
        }

        // Faz a requisição ao backend
        const response = await axios.get(`http://localhost:3000/api/auth/search?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho
          }
        });

        console.log('Resposta da API:', response.data);
        this.user = response.data; // Armazena os dados do usuário
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error.response || error.message);
        alert('Não foi possível carregar os dados do usuário.');
      }
    },
    getProfileImage(thumbnailPath) {
      if (!thumbnailPath) {
        // Caminho para imagem padrão, caso o usuário não tenha foto
        return 'http://localhost:3000/uploads/default-profile.png';
      }
      // Corrige o caminho da imagem com barras normais
      return `http://localhost:3000/${thumbnailPath.replace(/\\/g, '/')}`;
    },
    formatBirthDate(date) {
      if (!date) return null;
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('pt-BR', options);
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
  margin-bottom: 5px; /* Reduzido ainda mais o espaçamento em relação ao footer */
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  min-height: 400px;
  padding: 40px; /* Reduzi o padding para diminuir o espaço interno */
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

/* Botão de Editar Perfil */
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
