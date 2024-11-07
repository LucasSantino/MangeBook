<template>
  <div class="sidebar" :style="{ left: sidebarLeft }">
    <button @click="toggleSidebar" class="close-btn">&#10005;</button>

    <!-- Sidebar Image -->
    <div class="sidebar-image">
      <img src="/path/to/sidebar-image.jpg" alt="Sidebar Image" class="sidebar-img" />
    </div>

    <!-- Sidebar Menu -->
    <ul>
      <li>
        <a href="#" @click="toggleDropdown('dropdown-menu')">
          Menu 1 <span :class="{'rotacionado': isDropdownVisible('dropdown-menu')}" class="seta-icone">&#9660;</span>
        </a>
        <ul v-show="isDropdownVisible('dropdown-menu')" class="dropdown-menu">
          <li><a href="#">Option 1</a></li>
          <li><a href="#">Option 2</a></li>
        </ul>
      </li>
      <li>
        <a href="#" @click="toggleDropdown('dropdown-menu-books')">
          Gerenciamento (Livros) <span :class="{'rotacionado': isDropdownVisible('dropdown-menu-books')}" class="seta-icone">&#9660;</span>
        </a>
        <ul v-show="isDropdownVisible('dropdown-menu-books')" class="dropdown-menu">
          <li><a href="#">Livros</a></li>
          <li><a href="#">Adicionar Livro</a></li>
        </ul>
      </li>
      <li>
        <a href="#" @click="toggleDropdown('dropdown-menu-users')">
          Gerenciamento (Usuários) <span :class="{'rotacionado': isDropdownVisible('dropdown-menu-users')}" class="seta-icone">&#9660;</span>
        </a>
        <ul v-show="isDropdownVisible('dropdown-menu-users')" class="dropdown-menu">
          <li><a href="#">Usuários</a></li>
          <li><a href="#">Adicionar Usuário</a></li>
        </ul>
      </li>
      <li>
        <a href="#" @click="toggleDropdown('dropdown-menu-statistics')">
          Estatísticas <span :class="{'rotacionado': isDropdownVisible('dropdown-menu-statistics')}" class="seta-icone">&#9660;</span>
        </a>
        <ul v-show="isDropdownVisible('dropdown-menu-statistics')" class="dropdown-menu">
          <li><a href="#">Visão Geral</a></li>
          <li><a href="#">Relatórios</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sidebarLeft: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeDropdown: null, // Para controlar qual dropdown está aberto
    };
  },
  methods: {
    // Alternar a visibilidade de um dropdown específico
    toggleDropdown(menuId) {
      if (this.activeDropdown === menuId) {
        this.activeDropdown = null; // Fecha o dropdown se ele já estiver aberto
      } else {
        this.activeDropdown = menuId; // Abre o novo dropdown
      }
    },

    // Verificar se o dropdown está visível
    isDropdownVisible(menuId) {
      return this.activeDropdown === menuId;
    },

    // Fechar a sidebar
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: -250px;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #00334e;
  color: white;
  padding-top: 80px;
  transition: 0.3s;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.4);
}

/* Sidebar when toggled open */
.sidebar.open {
  left: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li a {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

/* Dropdown styles */
.dropdown-menu {
  display: none;
  list-style-type: none;
  padding-left: 20px;
  background-color: #00577b;
}

.seta-icone {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  margin-left: auto;
  margin-right: 15px;
  filter: invert(1);
}

.rotacionado {
  transform: rotate(180deg);
}

.dropdown-menu li a {
  font-size: 16px;
  color: white;
}

.dropdown-menu li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
