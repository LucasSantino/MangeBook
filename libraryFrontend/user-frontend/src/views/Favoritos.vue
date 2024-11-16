<template>
    <div class="container">
      <NavBar @toggle-sidebar="toggleSidebar" />
      <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
      <main>
        <div class="welcome-container">
          <h2 class="welcome-title">Livros Favoritos</h2>
          <p>Seja Bem-vindo à sua Biblioteca, explore todos os livros seus livros favoritos selecionados por você em um só lugar</p>
  
          <!-- Barra de Pesquisa dentro do Container de Boas-Vindas -->
          <div class="search-container2">
            <input
              type="text"
              class="search-bar2"
              placeholder="Pesquisar livros favoritos..."
              v-model="searchQuery"
            />
            <button class="search-icon2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Tabela de Livros -->
        <div class="tabela-container">
          <table class="livros-tabela">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="/Site - MangeBook/imagens/Harry Potter 1.webp" alt="Capa do Livro" class="thumbnail"></td>
                <td>Harry Potter e a Pedra Filosofal</td>
                <td>JK Rowling</td>
                <td>2007</td>
                <td>
                  <button class="btn-remover" @click="removerLivro">Remover</button>
                  <button class="btn-avaliar" @click="avaliarLivro">Avaliar</button>
                </td>
              </tr>
              <tr>
                <td><img src="/Site - MangeBook/imagens/Harry Potter 2.webp" alt="Capa do Livro" class="thumbnail"></td>
                <td>Harry Potter e a Câmara Secreta</td>
                <td>JK Rowling</td>
                <td>1949</td>
                <td>
                  <button class="btn-remover" @click="removerLivro">Remover</button>
                  <button class="btn-avaliar" @click="avaliarLivro">Avaliar</button>
                </td>
              </tr>
              <tr>
                <td><img src="/Site - MangeBook/imagens/Harry Potter3.webp" alt="Capa do Livro" class="thumbnail"></td>
                <td>Harry Potter e o Prisioneiro de Azkaban</td>
                <td>JK Rowling</td>
                <td>1899</td>
                <td>
                  <button class="btn-remover" @click="removerLivro">Remover</button>
                  <button class="btn-avaliar" @click="avaliarLivro">Avaliar</button>
                </td>
              </tr>
              <tr>
                <td><img src="/Site - MangeBook/imagens/PercyJacksom3.jpg" alt="Capa do Livro" class="thumbnail"></td>
                <td>Percy Jackson e a Maldição do Titã</td>
                <td>Rick Riordan</td>
                <td>2005</td>
                <td>
                  <button class="btn-remover" @click="removerLivro">Remover</button>
                  <button class="btn-avaliar" @click="avaliarLivro">Avaliar</button>
                </td>
              </tr>
              <tr>
                <td><img src="/Site - MangeBook/imagens/PercyJacksom4.jpg" alt="Capa do Livro" class="thumbnail"></td>
                <td>Percy Jackson e a Batalha do Labirinto</td>
                <td>Rick Riordan</td>
                <td>1988</td>
                <td>
                  <button class="btn-remover" @click="removerLivro">Remover</button>
                  <button class="btn-avaliar" @click="avaliarLivro">Avaliar</button>
                </td>
              </tr>
              <tr>
                <td><img src="/Site - MangeBook/imagens/PercyJacksom5.jpg" alt="Capa do Livro" class="thumbnail"></td>
                <td>Percy Jackson e o Último Olimpiano</td>
                <td>Rick Riordan</td>
                <td>1997</td>
                <td>
                  <button class="btn-remover" @click="removerLivro">Remover</button>
                  <button class="btn-avaliar" @click="avaliarLivro">Avaliar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Navegação de Páginas -->
        <div class="pagination">
          <button class="btn-navegacao" @click="previousPage" :disabled="currentPage === 1">Anterior</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button class="btn-navegacao" @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
        </div>
      </main>
    </div>
    <Footer />
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  import SideBar from "@/components/SideBar.vue";
  
  export default {
    components: {
      NavBar,
      SideBar,
    },
    data() {
      return {
        sidebarOpen: false,
        searchQuery: "",
        paginaAtual: 1,
        livros: [
          { id: 1, thumbnail: "/Site - MangeBook/imagens/Harry Potter 1.webp", titulo: "Harry Potter e a Pedra Filosofal", autor: "JK Rowling", ano: 2007 },
          { id: 2, thumbnail: "/Site - MangeBook/imagens/Harry Potter 2.webp", titulo: "Harry Potter e a Câmara Secreta", autor: "JK Rowling", ano: 1949 },
          { id: 3, thumbnail: "/Site - MangeBook/imagens/Harry Potter3.webp", titulo: "Harry Potter e o Prisioneiro de Azkaban", autor: "JK Rowling", ano: 1899 },
          { id: 4, thumbnail: "/Site - MangeBook/imagens/PercyJacksom3.jpg", titulo: "Percy Jackson e a Maldição do Titã", autor: "Rick Riordan", ano: 2005 },
          { id: 5, thumbnail: "/Site - MangeBook/imagens/PercyJacksom4.jpg", titulo: "Percy Jackson e a Batalha do Labirinto", autor: "Rick Riordan", ano: 1988 },
          { id: 6, thumbnail: "/Site - MangeBook/imagens/PercyJacksom5.jpg", titulo: "Percy Jackson e o Último Olimpiano", autor: "Rick Riordan", ano: 1997 },
        ],
      };
    },
    computed: {
      filteredLivros() {
        return this.livros.filter(
          (livro) =>
            livro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            livro.autor.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      currentPage() {
        return this.paginaAtual;
      },
      totalPages() {
        return Math.ceil(this.livros.length / 10);
      },
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
      previousPage() {
        if (this.paginaAtual > 1) {
          this.paginaAtual--;
        }
      },
      nextPage() {
        if (this.paginaAtual < this.totalPages) {
          this.paginaAtual++;
        }
      },
      removerLivro(event) {
        const index = this.livros.findIndex(livro => livro.id === event.target.closest('tr').querySelector('img').src);
        if (index !== -1) {
          this.livros.splice(index, 1);
        }
      },
      avaliarLivro() {
        alert('Avaliar livro');
      },
    },
  };
  </script>
  <style scoped>
  /* Estilo do corpo */
  body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }

  /* Container principal */
  main {
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  
  /* Estilo do container de boas-vindas */
  .welcome-container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    margin: 20px auto;
    width: 100%;
    max-width: 940px;
  }
  
  /* Ajuste do título dentro do container de boas-vindas */
  .welcome-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #00334e;
}
  
  /* Estilo para a barra de pesquisa 2*/
  .search-container2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    border-radius: 30%;
  }
  
  /* Estilo da barra de pesquisa 2*/
  .search-bar2 {
    width: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
  }
  
  /* Estilo do botão de pesquisa 2*/
  .search-icon2 {
    background-color: #00334e;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .search-icon2:hover {
    background-color: #0056b3;
  }
  
  .tabela-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    max-width: 80%;
  }
  
  .livros-tabela {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .livros-tabela th,
  .livros-tabela td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
    width: 20%;
  }
  
  .livros-tabela th {
    background-color: #00334e;
    color: white;
    font-weight: bold;
  }
  
  .livros-tabela tr:hover {
    background-color: #f1f1f1;
  }
  
  .thumbnail {
    width: 100px;
    height: auto;
    max-height: 150px;
    display: block;
    margin: 0 auto;
  }
  
  .btn-favoritar,
  .btn-remover,
  .btn-avaliar {
    padding: 6px 12px;
    margin: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100px;
  }
  
  .btn-favoritar,
  .btn-remover,
  .btn-avaliar {
    background-color: #00334e;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  .btn-favoritar:hover,
  .btn-remover:hover,
  .btn-avaliar:hover {
    background-color: #0056b3;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .btn-navegacao {
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #00334e;
    color: white;
    transition: background-color 0.3s;
  }
  
  .btn-navegacao:hover {
    background-color: #0056b3;
  }
  
  .pagination span {
    margin: 0 15px;
    color: #333;
  }
  </style>