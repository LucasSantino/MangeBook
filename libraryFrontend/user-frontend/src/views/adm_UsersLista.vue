<template>
    <div id="app">
      <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
      <NavBar @toggle-sidebar="toggleSidebar" />
  
      <!-- Sidebar Administrativa para administradores -->
      <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
  
      <!-- Conteúdo Principal -->
      <main>
        <div class="welcome-container">
          <h2 class="welcome-title">Lista de Usuários</h2>
          <p>Seja Bem-vindo à sua Biblioteca. Todos os Usuários cadastrados aparecem na lista abaixo.</p>
  
          <!-- Barra de Pesquisa -->
          <div class="search-container2">
            <input v-model="searchQuery" type="text" class="search-bar2" placeholder="Pesquisar...">
            <button class="search-icon2" @click="pesquisar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Tabela de Usuários -->
        <div class="usuarios-container">
          <table class="usuarios-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Livros Emprestados</th>
                <th>Livros Reservados</th>
                <th>Livros Atrasados</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.email }}</td>
                <td :id="'status-' + usuario.id">{{ usuario.status }}</td>
                <td>{{ usuario.livrosEmprestados }}</td>
                <td>{{ usuario.livrosReservados }}</td>
                <td>{{ usuario.livrosAtrasados }}</td>
                <td>
                  <div class="acao-container">
                    <button class="btn-status" @click="toggleStatus(usuario)">Status</button>
                    <div :id="'status-options-' + usuario.id" class="status-options" v-show="usuario.showOptions">
                      <button class="status-btn ativo" @click="setStatus(usuario, 'Ativo')">Ativo</button>
                      <button class="status-btn bloqueado" @click="setStatus(usuario, 'Bloqueado')">Bloqueado</button>
                    </div>
                    <button class="btn-enviar-mensagem" @click="enviarMensagemPopup">Enviar Mensagem</button>
                    <button class="btn-excluir" @click="excluirPopup(usuario)">Excluir</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Popup de Enviar Mensagem -->
        <div v-if="showMessagePopup" class="popup-container">
          <h3>Enviar Mensagem</h3>
          <textarea v-model="mensagemTexto" placeholder="Digite sua mensagem..." rows="5" cols="30"></textarea>
          <button @click="enviarMensagem">Enviar</button>
          <button @click="fecharPopup">Fechar</button>
        </div>
  
        <!-- Popup de Confirmação de Exclusão -->
        <div v-if="showExcluirPopup" class="popup-container">
          <h3>Excluir Usuário</h3>
          <p>Tem certeza de que deseja excluir este usuário?</p>
          <button class="confirm" @click="excluirUsuario">Confirmar</button>
          <button class="cancel" @click="fecharPopup">Cancelar</button>
        </div>
  
        <!-- Overlay para Popups -->
        <div v-if="showPopupOverlay" class="popup-overlay" @click="fecharPopup"></div>
  
        <!-- Botões de Paginação -->
        <div class="pagination-container">
          <button class="pagination-btn" @click="navegar('anterior')">Anterior</button>
          <span class="page-info">Página {{ paginaAtual }} de {{ totalPaginas }}</span>
          <button class="pagination-btn" @click="navegar('proxima')">Próximo</button>
        </div>
      </main>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import adm_SideBar from '@/components/adm_SideBar.vue';

export default {
  components: {
    NavBar,
    adm_SideBar,
  },
  data() {
    return {
      isSidebarOpen: false, // Controle do estado da sidebar
      searchQuery: '',
      usuarios: [
        { id: 1, nome: 'João da Silva', email: 'joao@exemplo.com', status: 'Ativo', livrosEmprestados: 3, livrosReservados: 1, livrosAtrasados: 0 },
        { id: 2, nome: 'Maria Oliveira', email: 'maria@exemplo.com', status: 'Bloqueado', livrosEmprestados: 1, livrosReservados: 0, livrosAtrasados: 2 },
        { id: 3, nome: 'Lucas Pereira', email: 'lucas@exemplo.com', status: 'Ativo', livrosEmprestados: 2, livrosReservados: 1, livrosAtrasados: 1 },
        { id: 4, nome: 'Fernanda Costa', email: 'fernanda@exemplo.com', status: 'Ativo', livrosEmprestados: 5, livrosReservados: 2, livrosAtrasados: 0 },
        { id: 5, nome: 'Bruno Almeida', email: 'bruno@exemplo.com', status: 'Bloqueado', livrosEmprestados: 0, livrosReservados: 3, livrosAtrasados: 4 },
        { id: 6, nome: 'Aline Santos', email: 'aline@exemplo.com', status: 'Ativo', livrosEmprestados: 4, livrosReservados: 0, livrosAtrasados: 1 },
        { id: 7, nome: 'Rafael Lima', email: 'rafael@exemplo.com', status: 'Bloqueado', livrosEmprestados: 1, livrosReservados: 1, livrosAtrasados: 0 },
      ],
      paginaAtual: 1,
      showMessagePopup: false,
      mensagemTexto: '',
      showExcluirPopup: false,
      usuarioExcluir: null,
      showPopupOverlay: false,
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.usuarios.length / 5);
    },
    usuariosFiltrados() {
      return this.usuarios.filter(usuario => {
        return usuario.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               usuario.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Alterna entre aberto e fechado
    },
    toggleStatus(usuario) {
      usuario.showOptions = !usuario.showOptions;
    },
    setStatus(usuario, status) {
      usuario.status = status;
      usuario.showOptions = false;
    },
    enviarMensagemPopup() {
      this.showMessagePopup = true;
      this.showPopupOverlay = true;
    },
    excluirPopup(usuario) {
      this.showExcluirPopup = true;
      this.showPopupOverlay = true;
      this.usuarioExcluir = usuario;
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
      this.showMessagePopup = false;
      this.showExcluirPopup = false;
      this.showPopupOverlay = false;
      this.mensagemTexto = '';
      this.usuarioExcluir = null;
    },
    navegar(direcao) {
      if (direcao === 'anterior' && this.paginaAtual > 1) {
        this.paginaAtual--;
      } else if (direcao === 'proxima' && this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },
    pesquisar() {
      // Função de pesquisa
    },
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

.status-btn:hover {
    background-color: #e2e6ea; /* Cor de hover para opções */
}

/* Estilos para os botões de status */
.status-btn.ativo {
    background-color: #28a745; /* Verde para Ativo */
    color: white;
}

.status-btn.bloqueado {
    background-color: #dc3545; /* Vermelho para Bloqueado */
    color: white;
}
/* Estilo do Popup */
.popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 1000;
}

/* Overlay para Popups */
#popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none;
}

/* Estilo para o botão de Enviar Mensagem */
#popup-enviar-mensagem button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin: 5px 0;
}

#popup-enviar-mensagem button:hover {
    background-color: #45a049;
}

/* Estilo para o botão de Excluir */
#popup-excluir button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin: 5px 0;
}

#popup-excluir button:hover {
    background-color: #e53935;
}

/* Caixa de Texto do Popup de Enviar Mensagem */
#mensagem-texto {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Adicionar mais estilos conforme necessário para o layout da tabela e outros componentes */


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
    color: #333; /* Cor do texto */
}

/* Rodapé */
.footer {
    background-color: #00334e;
    color: white;
    text-align: center;
    padding: 20px;
    width: 100%;
    margin: 0;
}

/* Estilo Responsivo */
@media (max-width: 768px) {
    .usuarios-tabela th, .usuarios-tabela td {
        padding: 2px; /* Ajustado para menor padding em telas menores */
        font-size: 10px; /* Diminuído em telas menores */
    }

    .search-bar2 {
        width: 100%;
        max-width: 300px;
    }

    .welcome-container {
        padding: 10px; /* Reduz o padding do container em telas menores */
    }

    .pagination-btn {
        padding: 8px 16px; /* Ajuste nos botões de paginação em telas pequenas */
    }
}


  </style>
  