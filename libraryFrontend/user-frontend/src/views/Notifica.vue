<template>
    <div class="container">
      <NavBar @toggle-sidebar="toggleSidebar" />
      <SideBar :isSidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />
      <main>
        <!-- Conteúdo principal -->
        <div class="welcome-container">
          <h2 class="welcome-title">Notificações</h2>
          <p>Acompanhe as últimas atualizações e mensagens da sua biblioteca.</p>
        </div>
  
        <!-- Exibição da mensagem quando não há notificações -->
        <div v-if="notificacoes.length === 0" class="no-notifications">
          <p>Você não possui mais notificações.</p>
        </div>
  
        <!-- Tabela de Notificações -->
        <div v-else class="notificacoes-container">
          <div class="tabela-container">
            <table class="notificacoes-tabela">
              <thead>
                <tr>
                  <th>Mensagem</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(notificacao, index) in notificacoes" :key="index">
                  <td>{{ notificacao.mensagem }}</td>
                  <td>{{ notificacao.data }}</td>
                  <td>
                    <button class="btn-marcar-lida" @click="marcarComoLida(index)">Marcar como Lida</button>
                    <button class="btn-excluir" @click="excluirNotificacao(index)">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Navegação de Páginas -->
        <div class="pagination">
          <button class="btn-navegacao" aria-label="Página anterior">Anterior</button>
          <span>Página 1 de 10</span>
          <button class="btn-navegacao" aria-label="Próxima página">Próximo</button>
        </div>
      </main>
    </div>
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
        notificacoes: [
          { mensagem: 'Livro "Harry Potter e a Pedra Filosofal" foi adicionado aos favoritos.', data: '02/11/2024', lida: false },
          { mensagem: 'Livro "Percy Jackson e a Maldição do Titã" foi removido da lista de desejos.', data: '01/11/2024', lida: false },
          { mensagem: 'Avaliação para "O Senhor dos Anéis" foi atualizada.', data: '31/10/2024', lida: false },
          { mensagem: 'Livro "1984" foi adicionado à sua biblioteca.', data: '30/10/2024', lida: false },
          { mensagem: 'O livro "A Revolução dos Bichos" recebeu uma nova avaliação de 5 estrelas.', data: '29/10/2024', lida: false },
          { mensagem: 'Você completou a leitura de "Dom Quixote". Parabéns!', data: '28/10/2024', lida: false },
          { mensagem: 'Livro "A Divina Comédia" foi adicionado à sua lista de desejos.', data: '27/10/2024', lida: false },
        ],
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
      marcarComoLida(index) {
        this.notificacoes[index].lida = true;
        alert('Notificação marcada como lida!');
      },
      excluirNotificacao(index) {
        this.notificacoes.splice(index, 1);
        alert('Notificação excluída com sucesso!');
        if (this.notificacoes.length === 0) {
          alert('Você não possui mais notificações');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para a mensagem de ausência de notificações */
  .no-notifications {
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #ddd;
    color: #333;
    font-size: 18px;
    margin-top: 20px;
  }
  

  .main {
    margin-top: 70px;
    padding: 10px;
    text-align: center;
  }
  
  .welcome-container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    margin: 20px auto;
    margin-top: 120px;
    width: 100%;
    max-width: 940px;
  }
  
  .welcome-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #00334e;
  }
  
  .notificacoes-container {
    display: flex;
    justify-content: center;
    padding: 20px;
    margin-bottom: 40px;
  }
  
  .tabela-container {
    width: 100%;
    max-width: 800px;
  }
  
  .notificacoes-tabela {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }
  
  .notificacoes-tabela thead th {
    background-color: #00334e;
    color: #ffffff;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  .notificacoes-tabela tbody td {
    background-color: #f9f9f9;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  
  .notificacoes-tabela tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  .btn-marcar-lida,
  .btn-excluir {
    padding: 5px 10px;
    margin: 0 5px;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    text-align: center;
    display: inline-block;
  }
  
  .btn-marcar-lida {
    background-color: #4CAF50;
    color: white;
  }
  
  .btn-excluir {
    background-color: #e74c3c;
    color: white;
  }
  
  .btn-marcar-lida:hover {
    background-color: #45a049;
  }
  
  .btn-excluir:hover {
    background-color: #c0392b;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
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
  
  .pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 80px; /* Aumentando a margem inferior */
}
  .footer {
    background-color: #00334e;
    color: white;
    text-align: center;
    padding: 20px;
    width: 100%;
  }
  </style>
  