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
          <!-- Imagem de perfil -->
          <img :src="getProfileImage(user.userThumbnail)" alt="Imagem de Perfil" class="foto-perfil" />

          <!-- Campo de Status -->
          <select v-model="status" class="status-select" @change="alterarStatusUsuario">
            <option value="Ativo">Ativo</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>

          <!-- Campo de Tipo de Usuário (Administrador/Usuário Comum) -->
          <select v-model="tipoUsuario" class="tipo-usuario-select">
            <option value="Administrador">Administrador</option>
            <option value="Usuário Comum">Usuário Comum</option>
          </select>
        </div>

        <div class="informacoes-container">
          <h2>Informações do Usuário</h2>
          <table class="informacoes-tabela">
            <tr>
              <td>ID do Usuário:</td>
              <td>{{ user._id }}</td>
            </tr>
            <tr>
              <td>Tipo de Usuário:</td>
              <td>{{ tipoUsuario }}</td>
            </tr>
            <tr>
              <td>Nome Completo:</td>
              <td>{{ user.username }}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>Data de Nascimento:</td>
              <td>{{ formatBirthDate(user.birthDate) }}</td>
            </tr>
            <tr>
              <td>CPF:</td>
              <td>{{ user.cpf }}</td>
            </tr>
            <tr>
              <td>Endereço:</td>
              <td>{{ user.address }}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{{ status }}</td>
            </tr>
          </table>

          <!-- Campo de notificação -->
          <div class="notificacao-container">
            <h3>Notificar Usuário</h3>
            <textarea v-model="notificacao" placeholder="Digite a notificação aqui..." rows="4"></textarea>
            <button @click="enviarNotificacao">Enviar Notificação</button>
          </div>
        </div>

        <!-- Tabela Histórico do Perfil -->
        <div class="historico-container">
          <h2>Histórico do Perfil</h2>
          <table class="historico-tabela">
            <thead>
              <tr>
                <th>Título</th>
                <th>Data de Empréstimo</th>
                <th>Data de Devolução</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="livro in historicoPaginado" :key="livro.id">
                <td>{{ livro.titulo }}</td>
                <td>{{ livro.dataEmprestimo }}</td>
                <td>{{ livro.dataDevolucao }}</td>
                <td :class="getStatusClass(livro.status)">
                  {{ livro.status }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Navegação de Páginas -->
          <div class="pagination">
            <button class="btn-navegacao" aria-label="Página anterior" @click="navegar('anterior')" :disabled="paginaAtual === 1">Anterior</button>
            <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
            <button class="btn-navegacao" aria-label="Próxima página" @click="navegar('proxima')" :disabled="paginaAtual === totalPaginas">Próximo</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import adm_SideBar from '@/components/adm_SideBar.vue';

export default {
  components: {
    NavBar,
    adm_SideBar,
  },
  data() {
    return {
      isSidebarOpen: false,
      user: {},
      notificacao: '',
      status: 'Ativo',
      tipoUsuario: 'Usuário Comum',
      historico: [],
      paginaAtual: 1,
      itensPorPagina: 5,
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.historico.length / this.itensPorPagina);
    },
    historicoPaginado() {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;
      return this.historico.slice(inicio, fim);
    },
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async fetchUserData() {
      try {
        const userId = this.$route.params.usuarioId;
        const token = localStorage.getItem('token');

        if (!userId || !token) {
          alert('Por favor, faça login novamente.');
          this.$router.push('/login');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/auth/search?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.user = response.data;
        this.status = this.user.isActive ? 'Ativo' : 'Inativo';
        this.tipoUsuario = this.user.role === 'admin' ? 'Administrador' : 'Usuário Comum';
      } catch (error) {
        alert('Não foi possível carregar os dados do usuário.');
      }
    },
    async alterarStatusUsuario() {
      try {
        const userId = this.user._id;
        const token = localStorage.getItem('token');

        if (!userId || !token) {
          alert('ID do usuário ou token não encontrados. Por favor, faça login novamente.');
          this.$router.push('/login');
          return;
        }

        const response = await axios.patch(
          `http://localhost:3000/api/auth/users/${userId}/toggle-status`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.user.isActive = response.data.user.isActive;
        this.status = this.user.isActive ? 'Ativo' : 'Inativo';

        alert(`Usuário ${this.user.isActive ? 'ativado' : 'desativado'} com sucesso!`);
      } catch (error) {
        console.error('Erro ao alterar o status do usuário:', error.response || error.message);
        alert('Não foi possível alterar o status do usuário.');
      }
    },
    enviarNotificacao() {
      alert('Notificação enviada com sucesso!');
      this.notificacao = '';
    },
    navegar(direcao) {
      if (direcao === 'anterior' && this.paginaAtual > 1) {
        this.paginaAtual--;
      } else if (direcao === 'proxima' && this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },
    getStatusClass(status) {
      if (status === 'Devolvido') return 'devolvido';
      if (status === 'Atrasado') return 'atrasado';
      if (status === 'Reservado') return 'reservado';
      return '';
    },
    getProfileImage(thumbnailPath) {
      if (!thumbnailPath) return 'http://localhost:3000/uploads/default-profile.png';
      return `http://localhost:3000/${thumbnailPath.replace(/\\/g, '/')}`;
    },
    formatBirthDate(date) {
      if (!date) return null;
      return new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
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
  width: 100%;
  max-width: 100%;
}

/* Estilos do wrapper de perfil */
.perfil-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 130px;
  margin-bottom: 120px;
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  min-height: 400px;
  padding: 60px 40px;
  flex-wrap: wrap;
  width: 50%;
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

/* Estilos da imagem de perfil */
.foto-perfil {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}

/* Estilos do campo de status */
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

/* Estilo do campo de Tipo de Usuário */
.tipo-usuario-select {
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

/* Estilos do container das informações do usuário */
.informacoes-container {
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
  flex: 1;
}

/* Estilos para o título das informações */
.informacoes-container h2 {
  font-size: 1.75rem;
  color: #00334e;
  margin-bottom: 20px;
  margin-left: 60px;
}

/* Estilos da tabela de informações */
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

/* Estilos do container de histórico */
.historico-container {
  margin-top: 40px;
  width: 80%;
  margin: 0 auto;
}

.historico-tabela {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilos para o título "Histórico do Perfil" dentro da tabela */
.historico-container h2 {
  font-size: 1.75rem;
  color: #00334e;
  margin-bottom: 20px;
  margin-top: 40px; /* Ajuste do espaçamento superior */
  text-align: center; /* Centralizar o título */
}


.historico-tabela th,
.historico-tabela td {
  padding: 8px;
  text-align: left;
  font-size: 1rem;
}

.historico-tabela th {
  background-color: #00334e;
  color: white;
}

.historico-tabela td {
  color: #333;
}

.devolvido {
  color: green;
}

.atrasado {
  color: red;
}

.reservado {
  color: blue; /* Adiciona um estilo específico para o status reservado */
}

/* Estilos do campo de notificação */
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
  width: 100%;
}

.notificacao-container button:hover {
  background-color: #0052a3;
}

/* Estilos da navegação de páginas */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.btn-navegacao {
  padding: 8px 16px;
  background-color: #00334e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 10px;
}

.btn-navegacao:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

span {
  font-size: 1rem;
  color: #00334e;
}

</style>
