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

// Função para mostrar o popup de enviar mensagem
function enviarMensagemPopup(userId) {
    // Exibir o popup de enviar mensagem
    const popup = document.getElementById('popup-enviar-mensagem');
    const overlay = document.getElementById('popup-overlay');
    popup.style.display = 'block';
    overlay.style.display = 'block';
    
    // Armazenar o ID do usuário para enviar a mensagem corretamente
    window.currentUserId = userId;
    
    // Opcional: Preencher o campo de mensagem com o nome do usuário
    const userName = document.querySelector(`#usuario-${userId} .user-name`).textContent;
    document.getElementById('campo-nome-usuario').value = userName;
}

// Função para enviar a mensagem
function enviarMensagem() {
    const mensagem = document.getElementById('mensagem-texto').value;
    
    if (!mensagem) {
        alert('Por favor, escreva uma mensagem antes de enviar.');
        return;
    }
    
    // Aqui você pode fazer o envio da mensagem para o usuário via API ou servidor
    alert(`Mensagem enviada para o usuário ${window.currentUserId}: ${mensagem}`);
    
    // Fechar o popup
    fecharPopup('popup-enviar-mensagem');
}

// Função para mostrar o popup de confirmação de exclusão
function excluirPopup(userId) {
    // Armazenar o ID do usuário para exclusão
    window.currentUserId = userId;
    
    // Exibir o popup de confirmação de exclusão
    const popup = document.getElementById('popup-excluir');
    const overlay = document.getElementById('popup-overlay');
    popup.style.display = 'block';
    overlay.style.display = 'block';
    
    // Opcional: Exibir o nome do usuário no popup
    const userName = document.querySelector(`#usuario-${userId} .user-name`).textContent;
    document.getElementById('campo-nome-exclusao').textContent = `Tem certeza que deseja excluir o usuário ${userName}?`;
}

// Função para excluir o usuário
function excluirUsuario() {
    // Aqui você pode realizar a exclusão do usuário via API ou servidor
    
    alert(`Usuário ${window.currentUserId} excluído!`);
    
    // Fechar o popup
    fecharPopup('popup-excluir');
    
    // Opcional: Remover o usuário da tabela (se estiver manipulando apenas no frontend)
    const row = document.querySelector(`#usuario-${window.currentUserId}`);
    if (row) {
        row.remove(); // Remove a linha da tabela
    }
}

// Função para fechar os popups
function fecharPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('popup-overlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}
