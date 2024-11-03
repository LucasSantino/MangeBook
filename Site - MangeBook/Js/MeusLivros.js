// Funções para favoritar, remover e avaliar
document.querySelectorAll('.btn-favoritar').forEach(button => {
  button.addEventListener('click', () => {
      alert("Livro favoritado!");
      // Aqui você pode adicionar código para favoritar o livro
  });
});

document.querySelectorAll('.btn-remover').forEach(button => {
  button.addEventListener('click', () => {
      if (confirm("Deseja remover este livro da sua biblioteca?")) {
          // Aqui você pode adicionar código para remover o livro da lista
          alert("Livro removido!");
      }
  });
});

document.querySelectorAll('.btn-avaliar').forEach(button => {
  button.addEventListener('click', () => {
      const nota = prompt("Por favor, insira sua avaliação (de 1 a 5):");
      if (nota >= 1 && nota <= 5) {
          alert(`Obrigado pela sua avaliação de ${nota}!`);
          // Aqui você pode adicionar código para salvar a avaliação
      } else {
          alert("Por favor, insira uma nota válida entre 1 e 5.");
      }
  });
});
