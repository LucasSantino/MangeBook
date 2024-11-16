<template>
    <div class="container">
      <NavBar @toggle-sidebar="toggleSidebar" />
      <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main>
      <!-- Container de Boas-Vindas -->
      <div class="welcome-container">
        <h2 class="welcome-title">Histórico</h2>
        <p>Abaixo estão os livros que você reservou, devolveu e que estão em atraso.</p>
  
        <!-- Barra de Pesquisa 2 -->
        <div class="search-container2">
          <input
            type="text"
            class="search-bar2"
            placeholder="Livros reservados, devolvidos ou atrasados..."
            v-model="searchQuery"
            @input="searchBooks"
          />
          <button class="search-icon2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Livros Reservados -->
      <div class="tabela-container">
        <h3>Livros Reservados</h3>
        <table class="livros-tabela">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Data de Reserva</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="livro in filteredReservedBooks" :key="livro.titulo">
              <td>{{ livro.titulo }}</td>
              <td>{{ livro.autor }}</td>
              <td>{{ livro.dataReserva }}</td>
              <td>{{ livro.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Navegação de Páginas -->
      <div class="pagination">
        <button
          class="btn-navegacao"
          :disabled="currentPage === 1"
          @click="navigatePage('previous')"
        >
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          class="btn-navegacao"
          :disabled="currentPage === totalPages"
          @click="navigatePage('next')"
        >
          Próximo
        </button>
      </div>
  
      <!-- Livros Devolvidos -->
      <div class="tabela-container">
        <h3>Livros Devolvidos</h3>
        <table class="livros-tabela">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Data de Devolução</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="livro in filteredReturnedBooks" :key="livro.titulo">
              <td>{{ livro.titulo }}</td>
              <td>{{ livro.autor }}</td>
              <td>{{ livro.dataDevolucao }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Navegação de Páginas -->
      <div class="pagination">
        <button
          class="btn-navegacao"
          :disabled="currentPage === 1"
          @click="navigatePage('previous')"
        >
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          class="btn-navegacao"
          :disabled="currentPage === totalPages"
          @click="navigatePage('next')"
        >
          Próximo
        </button>
      </div>
  
      <!-- Livros em Atraso -->
      <div class="tabela-container">
        <h3>Livros em Atraso</h3>
        <table class="livros-tabela">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Data de Empréstimo</th>
              <th>Data de Devolução Prevista</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="livro in filteredOverdueBooks" :key="livro.titulo">
              <td>{{ livro.titulo }}</td>
              <td>{{ livro.autor }}</td>
              <td>{{ livro.dataEmprestimo }}</td>
              <td>{{ livro.dataDevolucaoPrevista }}</td>
              <td>{{ livro.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Navegação de Páginas -->
      <div class="pagination">
        <button
          class="btn-navegacao"
          :disabled="currentPage === 1"
          @click="navigatePage('previous')"
        >
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          class="btn-navegacao"
          :disabled="currentPage === totalPages"
          @click="navigatePage('next')"
        >
          Próximo
        </button>
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
      searchQuery: '',
      currentPage: 1,
      booksPerPage: 10,
      reservedBooks: [
        { titulo: 'Harry Potter e a Pedra Filosofal', autor: 'JK Rowling', dataReserva: '01/10/2024', status: 'Reservado' },
        { titulo: 'Percy Jackson e a Maldição do Titã', autor: 'Rick Riordan', dataReserva: '15/10/2024', status: 'Reservado' },
        { titulo: 'O Senhor dos Anéis: A Sociedade do Anel', autor: 'J.R.R. Tolkien', dataReserva: '20/10/2024', status: 'Reservado' },
        { titulo: 'As Crônicas de Nárnia', autor: 'C.S. Lewis', dataReserva: '22/10/2024', status: 'Reservado' },
        { titulo: '1984', autor: 'George Orwell', dataReserva: '25/10/2024', status: 'Reservado' },
        { titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', dataReserva: '27/10/2024', status: 'Reservado' },
        { titulo: 'O Apanhador no Campo de Centeio', autor: 'J.D. Salinger', dataReserva: '30/10/2024', status: 'Reservado' },
        { titulo: 'O Guia do Mochileiro das Galáxias', autor: 'Douglas Adams', dataReserva: '02/11/2024', status: 'Reservado' },
        { titulo: 'O Perfume', autor: 'Patrick Süskind', dataReserva: '05/11/2024', status: 'Reservado' },
        { titulo: 'A Caverna', autor: 'José Saramago', dataReserva: '07/11/2024', status: 'Reservado' }
      ],
      returnedBooks: [
        { titulo: 'Harry Potter e a Câmara Secreta', autor: 'JK Rowling', dataDevolucao: '25/10/2024' },
        { titulo: 'Percy Jackson e a Batalha do Labirinto', autor: 'Rick Riordan', dataDevolucao: '30/10/2024' },
        { titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', dataDevolucao: '01/11/2024' },
        { titulo: 'Dom Casmurro', autor: 'Machado de Assis', dataDevolucao: '03/11/2024' },
        { titulo: 'A Revolução dos Bichos', autor: 'George Orwell', dataDevolucao: '05/11/2024' },
        { titulo: 'O Morro dos Ventos Uivantes', autor: 'Emily Brontë', dataDevolucao: '08/11/2024' },
        { titulo: 'Moby Dick', autor: 'Herman Melville', dataDevolucao: '10/11/2024' },
        { titulo: 'Admirável Mundo Novo', autor: 'Aldous Huxley', dataDevolucao: '12/11/2024' },
        { titulo: 'O Grande Gatsby', autor: 'F. Scott Fitzgerald', dataDevolucao: '15/11/2024' },
        { titulo: 'A Arte da Guerra', autor: 'Sun Tzu', dataDevolucao: '18/11/2024' }
      ],
      overdueBooks: [
  { titulo: 'O Código Da Vinci', autor: 'Dan Brown', dataEmprestimo: '01/10/2024', dataDevolucaoPrevista: '15/10/2024', status: 'Atrasado' },
  { titulo: 'O Senhor dos Anéis: As Duas Torres', autor: 'J.R.R. Tolkien', dataEmprestimo: '05/10/2024', dataDevolucaoPrevista: '20/10/2024', status: 'Atrasado' },
  { titulo: 'As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa', autor: 'C.S. Lewis', dataEmprestimo: '10/10/2024', dataDevolucaoPrevista: '25/10/2024', status: 'Atrasado' },
  { titulo: 'A Guerra dos Tronos', autor: 'George R.R. Martin', dataEmprestimo: '12/10/2024', dataDevolucaoPrevista: '27/10/2024', status: 'Atrasado' },
  { titulo: 'O Lobo da Estepe', autor: 'Hermann Hesse', dataEmprestimo: '15/10/2024', dataDevolucaoPrevista: '30/10/2024', status: 'Atrasado' },
  { titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', dataEmprestimo: '20/10/2024', dataDevolucaoPrevista: '04/11/2024', status: 'Atrasado' },
  { titulo: 'O Sol é Para Todos', autor: 'Harper Lee', dataEmprestimo: '22/10/2024', dataDevolucaoPrevista: '06/11/2024', status: 'Atrasado' },
  { titulo: 'O Grande Gatsby', autor: 'F. Scott Fitzgerald', dataEmprestimo: '25/10/2024', dataDevolucaoPrevista: '09/11/2024', status: 'Atrasado' },
  { titulo: 'A Menina que Roubava Livros', autor: 'Markus Zusak', dataEmprestimo: '30/10/2024', dataDevolucaoPrevista: '14/11/2024', status: 'Atrasado' },
  { titulo: 'O Retrato de Dorian Gray', autor: 'Oscar Wilde', dataEmprestimo: '02/11/2024', dataDevolucaoPrevista: '17/11/2024', status: 'Atrasado' }
],

      sidebarOpen: false,   // Controle da sidebar
      dropdown: {}          // Controle do dropdown
    };
  },
  computed: {
    filteredReservedBooks() {
      return this.filterBooks(this.reservedBooks);
    },
    filteredReturnedBooks() {
      return this.filterBooks(this.returnedBooks);
    },
    filteredOverdueBooks() {
      return this.filterBooks(this.overdueBooks);
    },
    totalPages() {
      return Math.ceil(this.filteredReservedBooks.length / this.booksPerPage);
    },
    paginatedReservedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = this.currentPage * this.booksPerPage;
      return this.filteredReservedBooks.slice(start, end);
    },
    paginatedReturnedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = this.currentPage * this.booksPerPage;
      return this.filteredReturnedBooks.slice(start, end);
    },
    paginatedOverdueBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      const end = this.currentPage * this.booksPerPage;
      return this.filteredOverdueBooks.slice(start, end);
    }
  },
  methods: {
    searchBooks() {
      this.currentPage = 1; // Reset to first page when search changes
    },
    navigatePage(direction) {
      if (direction === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    filterBooks(books) {
      if (!this.searchQuery) {
        return books;
      }
      return books.filter(book => book.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen; // Alterna o estado da Sidebar
    },
    toggleDropdown(menu) {
      this.dropdown[menu] = !this.dropdown[menu]; // Alterna o estado do dropdown
    }
  }
};
</script>


  
  <style scoped>
  /* Estilos principais da página */
main {
    padding: 20px;
}

/* Estilo do container de boas-vindas */
.welcome-container {
    background-color: #ffffff; /* Cor de fundo do container */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para o efeito de elevação */
    padding: 20px; /* Espaçamento interno */
    text-align: center; /* Centraliza o texto dentro do container */
    margin: 20px auto; /* Margem automática para centralizar */
    margin-top: 90px;
    width: 100%; /* Largura total do container */
    max-width: 940px; /* Ajuste conforme necessário para se alinhar com a tabela */
}

.welcome-title {
    text-align: center;
    margin-bottom: 20px;
    color: #00334e;
    font-size: 28px;
}

/* Estilo para a barra de pesquisa 2*/
.search-container2 {
    display: flex; /* Usando Flexbox para alinhar itens */
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */
    margin: 20px 0; /* Margem superior e inferior */
    border-radius: 30%;
}

/* Estilo da barra de pesquisa 2*/
.search-bar2 {
    width: 300px; /* Largura fixa ou percentual */
    padding: 10px; /* Espaçamento interno */
    border: 1px solid #ddd; /* Borda da barra de pesquisa */
    border-radius: 10px; /* Bordas arredondadas */
    font-size: 16px; /* Tamanho da fonte */
}

/* Estilo do botão de pesquisa 2*/
.search-icon2 {
    background-color: #00334e; /* Cor de fundo do botão */
    color: white; /* Cor do texto */
    border: none; /* Sem borda */
    border-radius: 4px; /* Bordas arredondadas */
    padding: 10px; /* Espaçamento interno */
    cursor: pointer; /* Muda o cursor ao passar por cima */
    margin-left: 10px; /* Margem à esquerda do botão */
}

.search-icon:hover2 {
    background-color: #0056b3; /* Cor mais escura ao passar o mouse */
}

.tabela-container {
    display: flex;
    flex-direction: column; /* Muda para coluna para que os títulos e tabelas fiquem empilhados */
    align-items: center; /* Centraliza horizontalmente */
    padding: 20px;
}

.livros-tabela {
    width: 100%;
    max-width: 800px; /* Define uma largura máxima para a tabela */
    border-collapse: collapse;
    font-family: Arial, sans-serif;
}

.livros-tabela thead th {
    background-color: #00334e;
    color: #ffffff;
    padding: 10px;
    text-align: center; /* Centraliza apenas os cabeçalhos */
    font-weight: bold;
}

.livros-tabela tbody td {
    background-color: #f9f9f9;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center; /* Centraliza o conteúdo das células */
}

.livros-tabela tbody tr:hover {
    background-color: #f1f1f1;
}

/* Estilo da navegação de páginas */
.pagination {
    margin-top: 20px; /* Espaçamento entre o conteúdo da tabela e os botões de navegação */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Adicionando espaçamento entre os botões e a próxima tabela */
.pagination + .tabela-container {
    margin-top: 30px; /* Espaçamento entre os botões e a próxima tabela */
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

.pagination span {
    margin: 0 15px; /* Margem lateral para o texto */
    color: #333; /* Cor do texto */
}



/* Ajustes responsivos */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
    }

    .search-container {
        margin-top: 10px;
    }

    .search-bar {
        width: 100%;
    }

    .sidebar {
        width: 100%;
    }

    .tabela-container {
        padding: 10px;
    }
}

  </style>
  