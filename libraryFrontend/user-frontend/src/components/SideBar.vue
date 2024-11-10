<template>
  <div v-show="isSidebarOpen" class="sidebar">
    <!-- Botão para fechar a Sidebar -->
    <button class="close-btn" @click="closeSidebar">×</button>

    <!-- Imagem no topo da sidebar -->
    <div class="sidebar-image">
      <img src="/Site - MangeBook/imagens/MangeBookLogo.png" alt="Imagem da Sidebar" class="sidebar-img">
    </div>

    <!-- Lista de Links -->
    <ul>
      <li><a href="index.html">Início</a></li>

      <!-- Menu Minha Biblioteca com Dropdown -->
      <li @click="toggleDropdown">
        <a href="javascript:void(0)">
          <i class="fas fa-book"></i> Minha Biblioteca
          <img :class="['seta-icone', { rotacionado: isDropdownOpen }]" src="https://cdn-icons-png.flaticon.com/512/271/271210.png" alt="Ícone seta">
        </a>
        <ul v-show="isDropdownOpen" class="dropdown-menu">
          <li><a href="/Site - MangeBook/MeusLivros.html">Meus Livros</a></li>
          <li><a href="/Site - MangeBook/Favoritos.html">Favoritos</a></li>
          <li><a href="/Site - MangeBook/ListaDesejos.html">Lista de Desejos</a></li>
        </ul>
      </li>

      <!-- Menu Perfil com Dropdown -->
      <li @click="toggleProfileDropdown">
        <a href="javascript:void(0)">
          Perfil
          <img :class="['seta-icone', { rotacionado: isProfileDropdownOpen }]" src="https://cdn-icons-png.flaticon.com/512/271/271210.png" alt="Ícone seta">
        </a>
        <ul v-show="isProfileDropdownOpen" class="dropdown-menu">
          <li><a href="/Site - MangeBook/PerfilUsuario.html">Informações de Perfil</a></li>
          <li><a href="/Site - MangeBook/Historico.html">Histórico</a></li>
          <li><a href="/Site - MangeBook/Notificacoes.html">Notificações</a></li>
        </ul>
      </li>

      <!-- Opção Sobre -->
      <li><a href="Sobre.html">Sobre</a></li>

      <!-- Botão de Sair -->
      <li><a href="/logout.html" class="logout-btn">Sair</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isDropdownOpen: false, // Controla a visibilidade do dropdown de "Minha Biblioteca"
      isProfileDropdownOpen: false, // Controla a visibilidade do dropdown de "Perfil"
    };
  },
  methods: {
    closeSidebar() {
      this.$emit('toggle-sidebar'); // Emite o evento para fechar a sidebar
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // Alterna a visibilidade do dropdown de "Minha Biblioteca"
    },
    toggleProfileDropdown() {
      this.isProfileDropdownOpen = !this.isProfileDropdownOpen; // Alterna a visibilidade do dropdown de "Perfil"
    }
  }
};
</script>

<style scoped>
/* Estilo para a imagem no topo da sidebar */
.sidebar-image {
  display: flex; /* Usando flexbox para garantir centralização */
  justify-content: center; /* Centraliza a imagem */
  margin-bottom: 20px; /* Espaço abaixo da imagem */
}

.sidebar-img {
  width: 100%; /* Ajusta a largura da imagem para ocupar toda a largura da sidebar */
  max-width: 220px; /* Largura máxima para a imagem */
  height: auto; /* Mantém a proporção da imagem */
  border-radius: 10px; /* Bordas arredondadas para um acabamento suave */
  margin-top: 5px; /* Espaço acima da imagem */
}

/* Sidebar */
.sidebar {
  position: fixed;
  left: 0px;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #00334e;
  color: white;
  padding-top: 80px; /* Ajuste para espaçar as opções mais para baixo */
  transition: 0.3s;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.4); /* Aumentei o tamanho e intensidade da sombra */
}

/* Remover pontos de lista */
.sidebar ul {
  list-style-type: none; /* Remove os pontos da lista */
  padding: 0;
  margin: 0;
}

/* Estilos dos links da sidebar */
.sidebar ul li a {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  display: flex; /* Usando flexbox para o alinhamento */
  align-items: center; /* Alinha verticalmente o texto e o ícone */
  gap: 0px; /* Espaçamento entre o texto e o ícone da seta */
  transition: background-color 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin-right: 8px;
}

/* Ícone da seta */
.seta-icone {
  width: 16px; /* Largura fixa para o ícone da seta */
  height: 16px; /* Altura fixa para o ícone da seta */
  transition: transform 0.3s ease; /* Transição suave para a rotação */
  margin-left: auto; /* Empurra a seta para o lado direito */
  margin-right: 15px; /* Aumenta o espaço entre o texto e a seta */
  filter: invert(1); /* Deixa o ícone da seta na cor branca */
}

/* Rotacionando a seta quando o dropdown é visível */
.rotacionado {
  transform: rotate(180deg); /* Rotação de 180 graus da seta */
}

/* Fechar botão da sidebar */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

/* Adicionando espaçamento entre as opções da sidebar (exceto dropdown) */
.sidebar ul li {
  margin-bottom: 15px; /* Espaçamento entre os itens da lista */
}

/* Removendo o espaçamento para itens do dropdown */
.sidebar .dropdown-menu li {
  margin-bottom: 0; /* Sem espaçamento entre os itens do dropdown */
}

/* Dropdown dentro da sidebar */
.dropdown-menu {
  display: block; /* Oculto por padrão */
  list-style-type: none;
  padding-left: 20px; /* Espaçamento para alinhamento */
  background-color: #00577b; /* Cor de fundo padrão do dropdown */
}

.dropdown-menu li a {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 0;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown-menu li a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

/* Estilos para o ícone da seta */
.seta-icone {
  width: 16px; /* Ajuste conforme necessário */
  transition: transform 0.3s ease; /* Transição suave para a rotação */
  margin-left: auto; /* Empurra a seta para o lado direito */
  margin-right: 15px; /* Aumenta o espaço entre o texto e a seta */
  filter: invert(1); /* Deixa a imagem branca */
}

/* Rotacionado para o dropdown */
.rotacionado {
  transform: rotate(180deg); /* Rotação da seta quando o dropdown é visível */
}

/* Estilo para o botão de sair (igual as opções da navbar) */
.logout-btn {
  color: white; /* Cor do texto (branco) */
  text-decoration: none; /* Remove o sublinhado */
  font-size: 18px; /* Tamanho da fonte */
  padding: 10px; /* Espaçamento interno */
  display: block;
  background-color: #00334e; /* Cor de fundo igual ao da navbar */
  border-radius: 5px; /* Bordas arredondadas */
  transition: background-color 0.3s ease, transform 0.2s; /* Transições suaves */
  margin-top: auto; /* Garante que o botão fique no final da lista */
}

/* Efeito hover para o botão de sair */
.logout-btn:hover {
  background-color: #00577b; /* Cor do fundo ao passar o mouse */
  transform: scale(1.05); /* Aumenta um pouco o tamanho
  tamanho do botão */
  border-radius: 5px;
}
</style>