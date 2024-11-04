// Função para marcar a notificação como lida
function marcarComoLida(botao) {
    const linha = botao.closest('tr'); // Encontra a linha onde o botão foi clicado
    linha.classList.add('lida'); // Adiciona uma classe que indica que a notificação foi lida
    alert('Notificação marcada como lida!');
  }
  
  // Função para excluir a notificação
  function excluirNotificacao(botao) {
    const linha = botao.closest('tr'); // Encontra a linha onde o botão foi clicado
    linha.remove(); // Remove a linha da tabela
    alert('Notificação excluída com sucesso!');
  }
  