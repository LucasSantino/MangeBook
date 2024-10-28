// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === '0px') {
      sidebar.style.left = '-250px'; // Esconde a sidebar
    } else {
      sidebar.style.left = '0px'; // Mostra a sidebar
    }
  }
  