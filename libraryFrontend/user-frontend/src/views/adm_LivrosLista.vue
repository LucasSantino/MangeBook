<template>
  <div id="app">
    <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
    <NavBar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar Administrativa para administradores -->
    <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Conteúdo Principal -->
    <main>
      <div class="welcome-container">
        <h2 class="welcome-title">Lista de Livros</h2>
        <p>Seja Bem-vindo à sua Biblioteca. Todos os Livros cadastrados aparecerão na lista abaixo.</p>

        <!-- Barra de Pesquisa -->
        <div class="search-container2">
          <input
            type="text"
            class="search-bar2"
            placeholder="Pesquisar livros cadastrados..."
            v-model="searchQuery"
          />
          <button class="search-icon2" @click="pesquisar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Tabela de Livros -->
      <div class="livros-container">
        <div class="tabela-container">
          <table class="livros-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano de Publicação</th>
                <th>Gênero</th>
                <th>ISBN</th>
                <th>Nº de Cópias</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="livro in livrosPaginados"
                :key="livro._id"
                @click="navegarParaDetalhes(livro._id)"
                style="cursor: pointer"
              >
                <td>{{ livro._id }}</td>
                <td>{{ livro.bookTitle }}</td>
                <td>{{ livro.bookAuthor }}</td>
                <td>{{ livro.publicationYear }}</td>
                <td>{{ livro.bookGenre }}</td>
                <td>{{ livro.isbn }}</td>
                <td>{{ livro.copiesAvailable }}</td>
                <td>
                  <div class="btn-container">
                    <button class="btn-editar" @click.stop="editarLivro(livro._id)">Editar Livro</button>
                    <button class="btn-remover" @click.stop="removerLivro(livro._id)">Remover</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Navegação de Páginas -->
          <div class="pagination">
            <button
              class="btn-navegacao"
              aria-label="Página anterior"
              :disabled="paginaAtual === 1"
              @click="navegar('anterior')"
            >
              Anterior
            </button>
            <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
            <button
              class="btn-navegacao"
              aria-label="Próxima página"
              :disabled="paginaAtual === totalPaginas"
              @click="navegar('proxima')"
            >
              Próximo
            </button>
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
      searchQuery: '',
      livros: [], // Todos os livros recebidos da API
      paginaAtual: 1, // Página inicial
      livrosPorPagina: 10, // Exibir 10 livros por página
    };
  },
  computed: {
    livrosFiltrados() {
      // Filtra os livros com base no termo de busca
      return this.livros.filter((livro) => {
        const titulo = livro.bookTitle?.toLowerCase() || '';
        const autor = livro.bookAuthor?.toLowerCase() || '';
        const query = this.searchQuery.toLowerCase();
        return titulo.includes(query) || autor.includes(query);
      });
    },
    livrosPaginados() {
      // Paginação dos livros filtrados
      const inicio = (this.paginaAtual - 1) * this.livrosPorPagina;
      const fim = inicio + this.livrosPorPagina;
      return this.livrosFiltrados.slice(inicio, fim);
    },
    totalPaginas() {
      // Calcula o número total de páginas
      return Math.ceil(this.livrosFiltrados.length / this.livrosPorPagina);
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    async buscarLivros() {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        this.livros = response.data;
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },
    navegar(direcao) {
      // Navegação entre páginas
      if (direcao === 'anterior' && this.paginaAtual > 1) {
        this.paginaAtual--;
      } else if (direcao === 'proxima' && this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },
    editarLivro(id) {
      this.$router.push(`/adm_editlivro/${id}`);
    },
    async removerLivro(id) {
      try {
        const confirmDelete = confirm('Tem certeza que deseja excluir este livro?');
        if (confirmDelete) {
          await axios.delete(`http://localhost:3000/api/books/${id}`);
          this.livros = this.livros.filter(livro => livro._id !== id); // Atualiza a lista localmente
          alert('Livro removido com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao remover o livro:', error);
        alert('Erro ao remover o livro.');
      }
    },
    navegarParaDetalhes(bookId) {
      this.$router.push({ name: 'DetalhesLivros', params: { bookId } });
    },
  },
  mounted() {
    this.buscarLivros(); // Busca os livros ao montar o componente
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
    width: 100%; /* Aumente a porcentagem conforme necessário */
    max-width: 1200px; /* Limite a largura máxima */
    margin: 50px auto; /* Aumenta a margem superior */
    padding: 20px; /* Espaçamento interno */
}

/* Estilo do container de boas-vindas */
.welcome-container {
    background-color: #ffffff; /* Cor de fundo do container */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para o efeito de elevação */
    padding: 20px; /* Espaçamento interno */
    text-align: center; /* Centraliza o texto dentro do container */
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
    display: flex; /* Usando Flexbox para alinhar itens */
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */
    margin: 20px 0; /* Margem superior e inferior */
}

/* Estilo da barra de pesquisa 2 */
.search-bar2 {
    width: 300px; /* Largura fixa ou percentual */
    padding: 6px; /* Diminuído */
    border: 1px solid #ddd; /* Borda da barra de pesquisa */
    border-radius: 10px; /* Bordas arredondadas */
    font-size: 14px; /* Diminuído */
}

/* Estilo do botão de pesquisa 2 */
.search-icon2 {
    background-color: #00334e; /* Cor de fundo do botão */
    color: white; /* Cor do texto */
    border: none; /* Sem borda */
    border-radius: 4px; /* Bordas arredondadas */
    padding: 6px; /* Diminuído */
    cursor: pointer; /* Muda o cursor ao passar por cima */
    margin-left: 10px; /* Margem à esquerda do botão */
}

/* Efeito de hover no botão de pesquisa 2 */
.search-icon2:hover {
    background-color: #0056b3; /* Cor mais escura ao passar o mouse */
}

/* Estilo do container de livros */
.livros-container {
    margin-top: 20px; /* Espaçamento superior */
    overflow-x: auto; /* Permite rolagem horizontal se necessário */
}

/* Tabela de Livros */
.livros-tabela {
    width: 100%; /* Faz a tabela ocupar toda a largura do container */
    max-width: 940px; /* Ajuste para a largura máxima do welcome-container */
    border-collapse: collapse; /* Para que as bordas das células se fundam */
    background-color: white; /* Cor de fundo da tabela */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra da tabela */
    margin: 20px auto; /* Centraliza a tabela */
    margin-top: 5px; /* Reduzido para 5px */
}

.livros-tabela th, .livros-tabela td {
    padding: 8px; /* Diminuído para td */
    text-align: center; /* Alinhamento do texto centralizado */
    border: 1px solid #ddd; /* Borda das células */
    font-size: 12px; /* Tamanho da fonte reduzido */
}

.livros-tabela th {
    height: 40px; /* Altura aumentada para th */
    background-color: #00334e; /* Cor de fundo do cabeçalho */
    color: white; /* Cor do texto do cabeçalho */
    font-weight: bold; /* Negrito */
}

/* Efeito de hover nas linhas da tabela */
.livros-tabela tr:hover {
    background-color: #f1f1f1; /* Cor de fundo ao passar o mouse */
}

/* Estilo dos botões */
.btn-container {
    display: flex; /* Ativa o Flexbox */
    flex-direction: column; /* Coloca os botões em coluna */
    gap: 10px; /* Espaçamento entre os botões */
    align-items: center; /* Centraliza os botões */
}

.btn-editar, .btn-remover {
    flex: 1; /* Faz os botões ocuparem a mesma largura */
    padding: 6px; /* Diminuído */
    cursor: pointer; /* Muda o cursor ao passar por cima */
    transition: background-color 0.3s; /* Efeito de transição ao passar o mouse */
    border: none; /* Sem borda */
    border-radius: 4px; /* Bordas arredondadas */
    min-width: 100px; /* Largura mínima para os botões */
}

/* Estilos específicos dos botões */
.btn-editar {
    background-color: #28a745; /* Verde */
    color: white;
}

.btn-editar:hover {
    background-color: #218838; /* Verde mais escuro ao passar o mouse */
}

.btn-remover {
    background-color: #dc3545; /* Vermelho */
    color: white;
}

.btn-remover:hover {
    background-color: #c82333; /* Vermelho mais escuro ao passar o mouse */
}

/* Estilo da navegação de páginas */
.pagination {
    display: flex; /* Flexbox para layout */
    justify-content: center; /* Centraliza os botões */
    align-items: center; /* Alinha verticalmente */
    margin-top: 20px; /* Espaçamento superior */
}

.btn-navegacao {
    padding: 10px 20px; /* Espaçamento interno dos botões */
    margin: 0 5px; /* Margem entre os botões */
    cursor: pointer; /* Muda o cursor ao passar por cima */
    border: none; /* Sem borda */
    border-radius: 4px; /* Bordas arredondadas */
    background-color: #00334e; /* Cor de fundo */
    color: white; /* Cor do texto */
    transition: background-color 0.3s; /* Efeito de transição */
}

.btn-navegacao:hover {
    background-color: #0056b3; /* Tom mais escuro ao passar o mouse */
}

/* Estilo do texto da página */
.pagination span {
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
    .livros-tabela th, .livros-tabela td {
        padding: 2px; /* Ajustado para menor padding em telas menores */
        font-size: 10px; /* Diminuído em telas menores */
    }

    .search-bar2 {
        width: 100%;
        max-width: 300px; /* Largura máxima da barra de pesquisa */
    }

    .welcome-container {
        padding: 10px; /* Reduz o padding do container em telas menores */
    }
}

  </style>
  