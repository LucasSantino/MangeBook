// Função para remover um livro da lista de desejos
function removerLivroDesejo(event) {
    const linhaLivro = event.target.closest("tr");
  
    if (linhaLivro) {
      linhaLivro.remove();
    }
  
    alert("Livro removido da lista de desejos.");
  }
  
  // Função para avaliar um livro, redirecionando para a página de detalhes
  function avaliarLivroDesejo() {
    window.location.href = "/Site - MangeBook/DetalhesLivros.html";
  }
  
  // Função para buscar livros na tabela de lista de desejos
  function buscarLivrosDesejos() {
    const input = document.querySelector(".search-bar2"); // Supondo que a barra de busca 2 esteja presente
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll(".livros-tabela tbody tr"); // Seleciona todas as linhas da tabela de desejos
  
    rows.forEach(row => {
      const title = row.cells[1].textContent.toLowerCase();
      const author = row.cells[2].textContent.toLowerCase();
  
      // Exibe a linha se o texto buscado estiver no título ou no autor
      if (title.includes(filter) || author.includes(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
  
  // Event listeners para os botões de remover e avaliar na lista de desejos
  document.querySelectorAll(".btn-remover").forEach(button => {
    button.addEventListener("click", removerLivroDesejo);
  });
  
  document.querySelectorAll(".btn-avaliar").forEach(button => {
    button.addEventListener("click", avaliarLivroDesejo);
  });
  
  // Event listener para a barra de busca
  document.querySelector(".search-bar2").addEventListener("input", buscarLivrosDesejos);
  