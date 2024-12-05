<template>
  <div id="app">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main>
      <div class="welcome-container">
        <h2 class="welcome-title">Lista de Usuários</h2>
        <p>Seja Bem-vindo à sua Biblioteca. Todos os Usuários cadastrados aparecem na lista abaixo.</p>

        <div class="search-container2">
          <input v-model="searchQuery" type="text" class="search-bar2" placeholder="Pesquisar..." />
          <button class="search-icon2" @click="pesquisar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="usuarios-container">
        <table class="usuarios-tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Livros Emprestados</th>
              <th>Livros Reservados</th>
              <th>Livros Atrasados</th>
              <th>Status</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuariosPaginados" :key="usuario.id">
              <td>{{ usuario.id }}</td>
              <td>{{ usuario.username }}</td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.livrosEmprestados || 0 }}</td>
              <td>{{ usuario.livrosReservados || 0 }}</td>
              <td>{{ usuario.livrosAtrasados || 0 }}</td>
              <td>{{ usuario.status }}</td>
              <td>{{ usuario.role }}</td>
              <td>
                <div class="acao-container">
                  <select v-model="usuario.status" @change="alterarStatus(usuario)">
                    <option value="Ativo">Ativo</option>
                    <option value="Bloqueado">Bloqueado</option>
                  </select>
                  <button class="btn-excluir" @click="excluirPopup(usuario)">Excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showExcluirPopup" class="popup-container">
        <h2 class="popup-title">Excluir Usuário</h2>
        <p class="popup-message">Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita.</p>
        <div class="popup-buttons">
          <button class="popup-button confirm" @click="excluirUsuario">Confirmar</button>
          <button class="popup-button cancel" @click="fecharPopup">Cancelar</button>
        </div>
      </div>

      <div v-if="showPopupOverlay" class="popup-overlay" @click="fecharPopup"></div>

      <div class="pagination-container">
        <button class="pagination-btn" @click="navegar('anterior')">Anterior</button>
        <span class="page-info">Página {{ paginaAtual }} de {{ totalPaginas }}</span>
        <button class="pagination-btn" @click="navegar('proxima')">Próximo</button>
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
      searchQuery: '',
      usuarios: [],
      paginaAtual: 1,
      showExcluirPopup: false,
      showPopupOverlay: false,
      usuarioExcluir: null,
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.usuariosFiltrados.length / 5);
    },
    usuariosFiltrados() {
      return this.usuarios.filter(usuario => {
        const nome = usuario.username?.toLowerCase() || '';
        const email = usuario.email?.toLowerCase() || '';
        return (
          nome.includes(this.searchQuery.toLowerCase()) || 
          email.includes(this.searchQuery.toLowerCase())
        );
      });
    },
    usuariosPaginados() {
      const start = (this.paginaAtual - 1) * 10;
      return this.usuariosFiltrados.slice(start, start + 10);
    },
  },
  methods: {
    carregarUsuarios() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'admin') {
        console.error('Acesso negado. Apenas administradores podem acessar esta funcionalidade.');
        return;
      }

      axios
        .get('http://localhost:3000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          this.usuarios = response.data.map(usuario => ({
            id: usuario._id, // Mapeando _id para id
            username: usuario.username,
            email: usuario.email,
            livrosEmprestados: usuario.livrosEmprestados || 0,
            livrosReservados: usuario.livrosReservados || 0,
            livrosAtrasados: usuario.livrosAtrasados || 0,
            status: usuario.isActive ? 'Ativo' : 'Bloqueado',
            role: usuario.role,
          }));
        })
        .catch(error => {
          console.error('Erro ao buscar usuários:', error.response?.data?.error || error.message);
        });
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    alterarStatus(usuario) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
      }

      axios
      axios
  .patch(`http://localhost:3000/api/auth/users/${usuario.id}/toggle-status`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
        .then(response => {
          usuario.status = response.data.user.isActive ? 'Ativo' : 'Bloqueado';
          console.log(`Status de ${usuario.username} alterado para ${usuario.status}`);
        })
        .catch(error => {
          console.error('Erro ao alterar o status do usuário:', error.response?.data?.error || error.message);
        });
    },
    excluirPopup(usuario) {
      this.usuarioExcluir = usuario;
      this.showExcluirPopup = true;
      this.showPopupOverlay = true;
    },
    excluirUsuario() {
      const index = this.usuarios.findIndex(usuario => usuario.id === this.usuarioExcluir.id);
      if (index !== -1) {
        this.usuarios.splice(index, 1);
        if (this.paginaAtual > this.totalPaginas) {
          this.paginaAtual = this.totalPaginas;
        }
      }
      this.fecharPopup();
    },
    fecharPopup() {
      this.showExcluirPopup = false;
      this.showPopupOverlay = false;
    },
    navegar(direcao) {
      if (direcao === 'anterior' && this.paginaAtual > 1) {
        this.paginaAtual--;
      } else if (direcao === 'proxima' && this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },
    pesquisar() {
      console.log('Pesquisando...');
    },
  },
  mounted() {
    this.carregarUsuarios();
  },
};
</script>







<style scoped>
/* Estilo do corpo */
body {
    background-color: #f0f0f0; /* Cor de fundo */
    font-family: Arial, sans-serif; /* Fonte padrão */
}

/* Container principal */
main {
    width: 100%;
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
}

/* Estilo do container de boas-vindas */
.welcome-container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    margin: 40px auto; /* Margem automática para centralizar */
    max-width: 940px; /* Largura máxima do container */
}

/* Seção de boas-vindas */
.welcome-title {
    font-size: 28px; /* Tamanho da fonte */
    font-weight: bold; /* Negrito */
    margin-bottom: 10px; /* Espaçamento abaixo */
    color: #00334e; /* Cor do texto */
}

/* Estilo para a barra de pesquisa 2 */
.search-container2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

/* Estilo da barra de pesquisa 2 */
.search-bar2 {
    width: 300px;
    padding: 6px; /* Diminuído */
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 14px; /* Diminuído */
}

/* Estilo do botão de pesquisa 2 */
.search-icon2 {
    background-color: #00334e;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px; /* Diminuído */
    cursor: pointer;
    margin-left: 10px;
}

/* Estilo do container de usuários */
.usuarios-container {
    margin-top: 20px;
    text-align: center; /* Centraliza o conteúdo */
}

/* Tabela de Usuários */
.usuarios-tabela {
    width: 100%; /* Faz a tabela ocupar toda a largura do container */
    max-width: 940px; /* Ajuste para a largura máxima do welcome-container */
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto; /* Centraliza a tabela */
    margin-top: 20px; /* Espaçamento superior igual ao welcome-container */
}

.usuarios-tabela th, .usuarios-tabela td {
    padding: 8px; /* Diminuído para td */
    text-align: center;
    border: 1px solid #ddd;
    font-size: 12px; /* Tamanho da fonte reduzido */
}

.usuarios-tabela th {
    height: 40px; /* Altura aumentada para th */
    background-color: #00334e;
    color: white;
    font-weight: bold;
}

/* Efeito de hover nas linhas da tabela */
.usuarios-tabela tr:hover {
    background-color: #f1f1f1;
}

/* Estilo do container de ações */
.acao-container {
    display: flex;
    flex-direction: column;
}

select {
    text-align: center;
}

/* Estilo dos botões */
.btn-editar {
    padding: 6px; /* Diminuído */
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    background-color: #28a745; /* Verde para Editar */
    color: white;
    margin: 3px 0; /* Espaçamento entre os botões */
}

.btn-editar:hover {
    background-color: #218838; /* Verde mais escuro */
}

/* Novo botão "Enviar Mensagem" */
.btn-enviar-mensagem {
    padding: 6px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    background-color:  #00334e; /* Azul para Enviar Mensagem */
    color: white;
    margin: 3px 0; /* Espaçamento entre os botões */
}

.btn-enviar-mensagem:hover {
    background-color: #0056b3; /* Azul mais escuro */
}

/* Estilo do botão Excluir */
.btn-excluir {
    padding: 6px; /* Diminuído */
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    background-color: #dc3545; /* Vermelho */
    color: white;
    margin: 3px 0; /* Espaçamento entre os botões */
}

.btn-excluir:hover {
    background-color: #c82333; /* Vermelho mais escuro */
}

/* Estilo do botão Status */
.btn-status {
    padding: 6px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    background-color: #00334e; /* Azul para Status */
    color: white;
    margin: 3px 0; /* Espaçamento entre os botões */
}

.btn-status:hover {
    background-color: #138496; /* Azul mais escuro */
}

/* Estilo das opções de Status */
.status-options {
    position: absolute;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 1;
}

.status-btn {
    padding: 6px;
    cursor: pointer;
    border: none;
    background-color: #f8f9fa;
    color: #333;
    width: 100%;
    text-align: left;
}

/* Popup de exclusão */
.popup-container {
    position: fixed; /* Fixa o popup na tela */
    top: 10%; /* Ajusta a posição no topo */
    left: 50%; /* Centraliza horizontalmente */
    transform: translateX(-50%); /* Centraliza */
    background-color: #ffffff; /* Fundo branco para combinar com a página */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
    border-radius: 8px; /* Bordas arredondadas */
    padding: 20px; /* Espaçamento interno */
    z-index: 1000; /* Garantia de sobreposição */
    width: 90%; /* Largura responsiva */
    max-width: 400px; /* Limita a largura máxima */
    text-align: center; /* Centraliza o conteúdo do popup */
    font-family: Arial, sans-serif; /* Fonte do layout principal */
    color: #00334e; /* Cor do texto combinando com o tema */
}

/* Título do popup */
.popup-title {
    font-size: 18px; /* Tamanho do texto */
    font-weight: bold; /* Texto em negrito */
    margin-bottom: 10px; /* Espaço inferior */
    color: #00334e; /* Cor do título */
}

/* Texto do corpo do popup */
.popup-message {
    font-size: 14px; /* Texto do corpo menor */
    margin-bottom: 20px; /* Espaçamento inferior */
    color: #666; /* Cor neutra */
}

/* Botões do popup */
.popup-buttons {
    display: flex; /* Botões lado a lado */
    justify-content: center; /* Centraliza os botões */
    gap: 10px; /* Espaçamento entre os botões */
}

.popup-button {
    padding: 10px 20px; /* Dimensões do botão */
    border: none; /* Remove borda padrão */
    border-radius: 4px; /* Bordas arredondadas */
    cursor: pointer; /* Mostra cursor de clique */
    transition: background-color 0.3s; /* Suaviza a transição */
    font-size: 14px; /* Texto dos botões */
    color: white; /* Texto branco */
}

.popup-button.confirm {
    background-color: #28a745; /* Cor verde para confirmar */
}

.popup-button.confirm:hover {
    background-color: #218838; /* Verde mais escuro no hover */
}

.popup-button.cancel {
    background-color: #dc3545; /* Cor vermelha para cancelar */
}

.popup-button.cancel:hover {
    background-color: #c82333; /* Vermelho mais escuro no hover */
}

/* Overlay do popup */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
    z-index: 999; /* Certifica-se de que está abaixo do popup */
}



/* Estilo da navegação de páginas */
.pagination-container {
    display: flex; /* Flexbox para layout */
    justify-content: center; /* Centraliza os botões */
    align-items: center; /* Alinha verticalmente */
    margin-top: 20px; /* Espaçamento superior */
}

.pagination-btn {
    padding: 10px 20px; /* Espaçamento interno dos botões */
    margin: 0 5px; /* Margem entre os botões */
    cursor: pointer; /* Muda o cursor ao passar por cima */
    border: none; /* Sem borda */
    border-radius: 4px; /* Bordas arredondadas */
    background-color: #00334e; /* Cor de fundo */
    color: white; /* Cor do texto */
    transition: background-color 0.3s; /* Efeito de transição */
}

.pagination-btn:hover {
    background-color: #0056b3; /* Tom mais escuro ao passar o mouse */
}

/* Estilo do texto da página */
.page-info {
    margin: 0 15px; /* Margem lateral para o texto */
    color: #00334e; /* Cor do texto */
}

/* Media query para telas pequenas */
@media (max-width: 768px) {
    .search-container2 {
        flex-direction: column;
    }

    .search-bar2 {
        width: 100%; /* Ajusta a largura para 100% em telas menores */
        margin-bottom: 10px; /* Espaço abaixo da barra de pesquisa */
    }

    .usuarios-tabela th, .usuarios-tabela td {
        padding: 4px; /* Ajuste do padding */
        font-size: 10px; /* Fonte menor em telas pequenas */
    }

    .welcome-container {
        margin-top: 20px; /* Reduz a margem superior */
        width: 100%; /* Largura 100% para o container */
    }

    .usuarios-tabela {
        font-size: 10px; /* Menor tamanho de fonte para tabelas */
    }

    .pagination-container {
        flex-direction: column; /* Empilha os botões de paginação */
    }
}

</style>

  