// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.left === '0px') {
      sidebar.style.left = '-250px'; // Esconde a sidebar
  } else {
      sidebar.style.left = '0px'; // Mostra a sidebar
  }
}

// Função para alternar a visibilidade do menu Dropdown da side bar
function toggleDropdown() {
  const dropdownMenu = document.getElementById("dropdown-menu");
  const setaIcon = document.getElementById("seta-icon");

  dropdownMenu.classList.toggle("visible"); // Alterna a visibilidade do dropdown
  setaIcon.classList.toggle("rotacionado"); // Alterna a rotação da seta

  // Altera a propriedade de display com base na visibilidade
  if (dropdownMenu.classList.contains("visible")) {
    dropdownMenu.style.display = "block"; // Mostra o dropdown
  } else {
    dropdownMenu.style.display = "none"; // Oculta o dropdown
  }
}

// Função para alternar a visibilidade do menu Dropdown do perfil
function toggleProfileDropdown() {
  const dropdownMenu = document.getElementById("profile-dropdown-menu");
  const profileSetaIcon = document.getElementById("profile-seta-icon");

  dropdownMenu.classList.toggle("visible"); // Alterna a visibilidade do dropdown
  profileSetaIcon.classList.toggle("rotacionado"); // Alterna a rotação da seta

  // Altera a propriedade de display com base na visibilidade
  if (dropdownMenu.classList.contains("visible")) {
    dropdownMenu.style.display = "block"; // Mostra o dropdown
  } else {
    dropdownMenu.style.display = "none"; // Oculta o dropdown
  }
}