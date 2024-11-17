<template>
    <div id="app">
      <!-- Navbar com o evento de toggle para abrir/fechar a sidebar -->
      <NavBar @toggle-sidebar="toggleSidebar" />
  
      <!-- Sidebar Administrativa para administradores, sempre será carregada -->
      <adm_SideBar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    
      <!-- Conteúdo principal -->
      <main>
        <div class="container-pai">
          <!-- Cards Estatísticas -->
          <div class="cards-container">
            <div class="card">
              <h3>Livros Emprestados</h3>
              <div class="number">25</div>
            </div>
            <div class="card">
              <h3>Livros Reservados</h3>
              <div class="number">15</div>
            </div>
            <div class="card">
              <h3>Livros em Atraso</h3>
              <div class="number">5</div>
            </div>
            <div class="card">
              <h3>Usuários Ativos</h3>
              <div class="number">120</div>
            </div>
          </div>
  
          <!-- Gráficos -->
          <div class="charts">
            <div class="chart-container">
              <canvas id="livrosMaisEmprestados"></canvas>
            </div>
            <div class="chart-container">
              <canvas id="historicoReservas"></canvas>
            </div>
          </div>
  
          <!-- Gráfico Comparativo (embaixo dos outros gráficos) -->
          <div id="chart1-container">
            <canvas id="livrosComparativo"></canvas>
          </div>
  
          <!-- Tabela de Reservas -->
          <div class="reservas-historico">
            <h3>Histórico de Reservas</h3>
            <table class="reservas-tabela">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Livro</th>
                  <th>Data da Reserva</th>
                  <th>Data do Empréstimo</th>
                  <th>Data de Devolução</th>
                  <th>Status</th>
                  <th>Tipo de Reserva</th>
                  <th>Funcionário Responsável</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>João Silva</td>
                  <td>Aprendendo JavaScript</td>
                  <td>10/10/2024</td>
                  <td>12/10/2024</td>
                  <td>19/10/2024</td>
                  <td>Ativo</td>
                  <td>Online</td>
                  <td>Maria Oliveira</td>
                </tr>
                <tr>
                  <td>Ana Santos</td>
                  <td>HTML e CSS para Iniciantes</td>
                  <td>08/10/2024</td>
                  <td>10/10/2024</td>
                  <td>17/10/2024</td>
                  <td>Concluído</td>
                  <td>Presencial</td>
                  <td>João Pereira</td>
                </tr>
                <tr>
                  <td>Carlos Lima</td>
                  <td>Introdução ao React</td>
                  <td>15/10/2024</td>
                  <td>17/10/2024</td>
                  <td>24/10/2024</td>
                  <td>Ativo</td>
                  <td>Online</td>
                  <td>Camila Souza</td>
                </tr>
                <tr>
                  <td>Laura Costa</td>
                  <td>Python para Iniciantes</td>
                  <td>20/10/2024</td>
                  <td>22/10/2024</td>
                  <td>29/10/2024</td>
                  <td>Concluído</td>
                  <td>Presencial</td>
                  <td>Paulo Alves</td>
                </tr>
                <tr>
                  <td>Fernanda Martins</td>
                  <td>JavaScript Avançado</td>
                  <td>01/11/2024</td>
                  <td>03/11/2024</td>
                  <td>10/11/2024</td>
                  <td>Ativo</td>
                  <td>Online</td>
                  <td>Aline Ferreira</td>
                </tr>
              </tbody>
            </table>
          </div>                
        </div>
      </main>
  
      <router-view></router-view> <!-- O conteúdo da rota será renderizado aqui -->
    </div>
  </template>
  
  <script>
  // Importação dos componentes
  import NavBar from '@/components/NavBar.vue';
  import adm_SideBar from '@/components/adm_SideBar.vue';
  
  export default {
    components: {
      NavBar,
      adm_SideBar,  // Apenas a adm_SideBar será usada
    },
    data() {
      return {
        isSidebarOpen: false, // Controla a visibilidade da sidebar
        isAdmin: false, // Controle para saber se o usuário é administrador
      };
    },
    methods: {
      toggleSidebar() {
        // Alterna o estado da sidebar
        this.isSidebarOpen = !this.isSidebarOpen;
      },
    },
    created() {
      // Verifique se o usuário é administrador com base em uma lógica específica
      // Aqui usamos o localStorage como exemplo (substitua pela lógica da sua aplicação)
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';  // Aqui você verifica se o usuário é admin
    },
  };
  </script>
  
  <style scoped>
  /* Estilo do corpo */
body {
    background-color: #f0f0f0; /* Cor de fundo */
    font-family: Arial, sans-serif; /* Fonte padrão */
    margin: 0; /* Remover margem padrão */
    padding: 0; /* Remover padding padrão */
}

/* Estilo do container pai */
.container-pai {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    margin-top: 120px; /* Distância aumentada entre o conteúdo e a navbar */
    margin-bottom: 60px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo do container dos cards */
.cards-container {
    display: flex; /* Para os cards ficarem lado a lado */
    justify-content: space-between; /* Espaço igual entre os cards */
    flex-wrap: wrap; /* Permite que os cards quebrem para a próxima linha se o espaço for insuficiente */
    gap: 20px; /* Aumenta o espaçamento entre os cards */
    margin-bottom: 60px; /* Aumentando o espaçamento inferior dos cards */
}

/* Estilo de cada card */
.card {
    background-color: #ffffff; /* Cor de fundo do card */
    border-radius: 15px; /* Bordas mais arredondadas para maior suavidade */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* Sombra mais forte e maior para maior profundidade */
    padding: 20px; /* Aumentado o espaçamento interno do card */
    text-align: center; /* Alinha o conteúdo no centro */
    width: 250px; /* Largura dos cards ajustada para maior tamanho */
    height: 180px; /* Altura dos cards ajustada */
    display: flex; /* Flexbox para centralizar o conteúdo dentro do card */
    flex-direction: column; /* Alinha o conteúdo em coluna */
    justify-content: center; /* Centraliza o conteúdo */
    align-items: center; /* Alinha os itens no centro */
    font-size: 18px; /* Tamanho de fonte aumentado para maior legibilidade */
    color: #00334e; /* Cor do texto para o mesmo azul da navbar */
    transition: box-shadow 0.3s ease-in-out; /* Transição suave para a sombra */
}

/* Efeito de hover para os cards */
.card:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2); /* Aumenta a profundidade ao passar o mouse */
}

/* Estilo do título dentro do card */
.card h3 {
    margin-bottom: 15px; /* Espaçamento entre o título e o número */
    font-weight: normal; /* Título não tão forte quanto o número */
}

/* Estilo do número dentro do card */
.card .number {
    font-size: 24px; /* Tamanho do número aumentado */
    font-weight: bold; /* Número em negrito */
    margin-top: 5px; /* Espaçamento entre o número e o título */
}

/* Estilo para os gráficos */
.charts {
    display: flex; /* Usando flexbox para colocar os gráficos lado a lado */
    justify-content: space-between; /* Espaço entre os gráficos */
    gap: 20px; /* Espaço entre os gráficos */
    margin-top: 80px; /* Aumentando o espaçamento superior para os gráficos */
    margin-bottom: 40px; /* Aumentando o espaço inferior entre os gráficos e a seção abaixo */
    flex-wrap: wrap; /* Garante que os gráficos se ajustem ao tamanho da tela */
}

/* Container para cada gráfico (livros e histórico de reservas) */
.chart-container {
    flex: 1; /* Permite que os gráficos ocupem o mesmo tamanho */
    height: 350px; /* Altura aumentada para os gráficos de Livros Emprestados e Reservas */
    margin-bottom: 30px; /* Aumenta o espaçamento entre os gráficos */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adicionando sombra para profundidade nos gráficos */
    border-radius: 12px; /* Bordas arredondadas nos gráficos */
    background-color: #ffffff; /* Fundo branco para os gráficos */
}

/* Especificamente para o gráfico comparativo de livros (maior) */
#chart1-container {
    height: 400px; /* Tornando o gráfico comparativo maior */
    flex: 100%; /* O gráfico comparativo ocupará toda a largura disponível */
    margin-top: 60px; /* Distância superior maior para o gráfico comparativo */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); /* Sombra mais forte para o gráfico comparativo */
}

/* Estilos gerais para gráficos */
canvas {
    max-width: 100%; /* Garante que o gráfico não exceda o container */
    height: 100% !important; /* Garante que o gráfico preencha a altura do container */
    border-radius: 8px; /* Bordas arredondadas nos gráficos */
}

.reservas-historico h3 {
    text-align: center; /* Centraliza o título */
    font-size: 24px; /* Tamanho maior para o título */
    margin-bottom: 20px; /* Aumenta o espaçamento abaixo do título */
}

/* Estilo para a tabela de reservas */
.reservas-historico {
    margin-top: 60px; /* Ajustei o espaçamento superior da tabela */
}

/* Estilos para a tabela de reservas */
.reservas-tabela {
    width: 100%; /* Tabela ocupa toda a largura disponível */
    border-collapse: collapse; /* Remove espaçamento entre as bordas */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); /* Sombra suave para profundidade na tabela */
    border-radius: 12px; /* Bordas arredondadas na tabela */
    background-color: #ffffff; /* Fundo branco para a tabela */
    overflow: hidden; /* Garante que os cantos arredondados fiquem bem definidos */
}

/* Estilo para as células da tabela */
.reservas-tabela th, .reservas-tabela td {
    padding: 12px; /* Aumento do espaçamento nas células */
    text-align: center; /* Alinha texto ao centro */
    border: 1px solid #ddd; /* Borda suave nas células */
    font-size: 16px; /* Ajuste do tamanho da fonte */
}

/* Estilo da borda das colunas da tabela */
.reservas-tabela th {
    background-color: #00334e; /* Cor de fundo para o cabeçalho da tabela */
    color: white; /* Cor do texto */
    font-weight: bold; /* Deixar o texto mais forte */
}

/* Efeito de profundidade para a tabela */
.reservas-tabela:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15); /* Aumenta a profundidade da tabela ao passar o mouse */
}

/* Media query para telas menores */
@media (max-width: 768px) {
    .cards-container {
        flex-direction: column; /* Empilha os cards em telas pequenas */
        align-items: center;
    }

    .charts {
        flex-direction: column; /* Empilha os gráficos em telas pequenas */
    }

    .card {
        width: 100%; /* Faz os cards ocuparem toda a largura disponível */
        max-width: 300px; /* Limita a largura máxima dos cards */
    }
}

  </style>
  