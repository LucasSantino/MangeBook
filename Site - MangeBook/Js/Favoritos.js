// Função para remover um livro dos favoritos
function removerLivro(event) {
    // Encontra o elemento da linha do livro a ser removido
    const linhaLivro = event.target.closest("tr");
  
    // Remove a linha do livro da tabela, se ela existir
    if (linhaLivro) {
      linhaLivro.remove();
      alert("Livro removido dos favoritos.");
    } else {
      console.warn("Linha do livro não encontrada para remoção.");
    }
}
  
// Função para avaliar um livro, redirecionando para a página de detalhes
function avaliarLivro() {
    // Redireciona para a página de detalhes do livro
    window.location.href = "/Site - MangeBook/DetalhesLivros.html";
}
  
// Função para buscar livros na tabela de favoritos
function buscarLivrosFavoritos() {
    const input = document.querySelector(".search-bar2");
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll(".livros-tabela tbody tr");
  
    rows.forEach(row => {
      const title = row.cells[1].textContent.toLowerCase(); // Obtém o título do livro
      const author = row.cells[2].textContent.toLowerCase(); // Obtém o autor do livro
  
      // Exibe a linha se o texto buscado estiver no título ou no autor
      if (title.includes(filter) || author.includes(filter)) {
        row.style.display = ""; // Exibe a linha
      } else {
        row.style.display = "none"; // Oculta a linha
      }
    });
}
