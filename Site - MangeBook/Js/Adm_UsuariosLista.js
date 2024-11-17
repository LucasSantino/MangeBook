// Função para alternar entre o estado das opções de status
function toggleStatus(button, userId) {
    const statusOptions = document.getElementById(`status-options-${userId}`);
    
    // Alternar a visibilidade das opções de status
    if (statusOptions.style.display === 'block') {
        statusOptions.style.display = 'none';  // Fechar as opções
    } else {
        statusOptions.style.display = 'block';  // Mostrar as opções
    }
}

// Função para aplicar o status selecionado
function setStatus(userId, status) {
    // Atualizar o texto da célula de status com o novo status
    const statusCell = document.getElementById(`status-${userId}`);
    statusCell.textContent = status;

    // Atualizar o botão de status
    const statusButton = document.querySelector(`.acao-container button[onclick="toggleStatus(this, ${userId})"]`);
    statusButton.textContent = status;
    
    // Alterar a cor do botão de status com base no novo status
    if (status === 'Ativo') {
        statusButton.style.backgroundColor = '#28a745';  // Verde para Ativo
    } else if (status === 'Bloqueado') {
        statusButton.style.backgroundColor = '#dc3545';  // Vermelho para Bloqueado
    }

    // Fechar o menu de opções
    document.getElementById(`status-options-${userId}`).style.display = 'none';
}
