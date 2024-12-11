<template>
  <div class="container">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main>
      <div class="welcome-container">
        <h2 class="welcome-title">Meus Livros</h2>
        <p>Seja bem-vindo à sua Biblioteca, explore todos os livros selecionados por você em um só lugar.</p>

        <!-- Barra de Pesquisa -->
        <div class="search-container2">
          <input
            type="text"
            class="search-bar2"
            placeholder="Pesquisar em Meus livros..."
            v-model="searchQuery"
          />
          <button class="search-icon2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.728 3.728a1 1 0 0 0 1.415-1.414l-3.728-3.728zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Tabela de Livros -->
      <div class="tabela-container">
        <table class="livros-tabela" v-if="!loading && filteredReservas.length > 0">
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
            <tr v-for="reserva in currentPageReservas" :key="reserva._id">
              <td><img :src="reserva.book.bookThumbnail" alt="Capa do Livro" class="thumbnail"></td>
              <td>{{ reserva.book.bookTitle }}</td>
              <td>{{ reserva.book.bookAuthor }}</td>
              <td>{{ reserva.book.publicationYear }}</td>
              <td>
                <button class="btn-favoritar">Favoritar</button>
                <button class="btn-remover" @click="removerReserva(reserva._id)">Devolver</button>
                <button class="btn-avaliar">Avaliar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else-if="!loading && filteredReservas.length === 0" class="no-data-message">Nenhuma reserva encontrada.</p>
        <p v-else class="loading-message">Carregando suas reservas...</p>
      </div>

      <!-- Paginação -->
      <div class="pagination">
        <button class="btn-navegacao" aria-label="Página anterior" @click="previousPage" :disabled="currentPage === 1">
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="btn-navegacao" aria-label="Próxima página" @click="nextPage" :disabled="currentPage === totalPages">
          Próximo
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      sidebarOpen: false,
      searchQuery: "",
      reservas: [],
      loading: false,
      currentPage: 1,
      error: null,
    };
  },
  computed: {
    filteredReservas() {
      return this.reservas.filter(
        (reserva) =>
          reserva.book.bookTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          reserva.book.bookAuthor.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredReservas.length / 5); // Ajuste para mostrar 5 livros por página
    },
    currentPageReservas() {
      const start = (this.currentPage - 1) * 5;
      const end = start + 5;
      return this.filteredReservas.slice(start, end);
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async fetchReservas() {
      this.loading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("token"); // Token de autenticação
        const response = await axios.get("http://localhost:3000/api/reservations/user/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.reservas = response.data.map((reserva) => ({
          ...reserva,
          book: {
            ...reserva.book,
            bookThumbnail: `http://localhost:3000/${reserva.book.bookThumbnail.replace(/\\/g, "/")}`,
          },
        }));
      } catch (err) {
        this.error = "Erro ao carregar reservas.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async removerReserva(reservationId) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(`http://localhost:3000/api/reservations/${reservationId}/return`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.reservas = this.reservas.filter((reserva) => reserva._id !== reservationId);
        alert("Reserva removida com sucesso!");
      } catch (err) {
        alert("Erro ao remover a reserva.");
        console.error(err);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.fetchReservas();
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
  