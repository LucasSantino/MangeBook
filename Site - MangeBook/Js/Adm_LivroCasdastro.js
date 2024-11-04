// Função para pré-visualizar a imagem carregada
function previewImage(event) {
    const preview = document.getElementById('preview-thumbnail');
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado

    if (file) {
        const reader = new FileReader(); // Cria um FileReader para ler o arquivo
        reader.onload = function(e) {
            preview.src = e.target.result; // Define a imagem de pré-visualização
            preview.style.display = 'block'; // Mostra a imagem
            document.getElementById('preview-container').style.display = 'flex'; // Mostra o container de pré-visualização
        };
        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    } else {
        preview.style.display = 'none'; // Esconde a imagem se não houver arquivo
        document.getElementById('preview-container').style.display = 'none'; // Esconde o container de pré-visualização
    }
}

// Atualiza o ID do livro na pré-visualização
document.getElementById('livroId').addEventListener('input', function() {
    document.getElementById('preview-id').innerText = this.value || 'ID do Livro';
});

// Atualiza o título na pré-visualização
document.getElementById('titulo').addEventListener('input', function() {
    document.getElementById('preview-titulo').innerText = this.value || 'Nome do Livro';
});

// Atualiza o autor na pré-visualização
document.getElementById('autor').addEventListener('input', function() {
    document.getElementById('preview-autor').innerText = this.value || 'Nome do Autor';
});

// Atualiza o ano de publicação na pré-visualização
document.getElementById('anoPublicacao').addEventListener('input', function() {
    document.getElementById('preview-ano').innerText = this.value || '2024';
});

// Atualiza o gênero na pré-visualização
document.getElementById('genero').addEventListener('input', function() {
    document.getElementById('preview-genero').innerText = this.value || 'Ficção Científica';
});

// Atualiza o ISBN na pré-visualização
document.getElementById('isbn').addEventListener('input', function() {
    document.getElementById('preview-isbn').innerText = this.value || '978-3-16-148410-0';
});

// Atualiza o número de cópias na pré-visualização
document.getElementById('numCopias').addEventListener('input', function() {
    document.getElementById('preview-copias').innerText = this.value || '5';
});

// Seleciona o campo de descrição e o elemento que exibirá a pré-visualização
const descricaoInput = document.getElementById('descricao');
const charCountDisplay = document.getElementById('charCount');
const maxLength = 630; // Define o limite máximo de caracteres

// Adiciona um evento que é acionado sempre que o usuário digita no campo de descrição
descricaoInput.addEventListener('input', () => {
    // Verifica se o texto excede o limite máximo
    if (descricaoInput.value.length > maxLength) {
        // Trunca o texto para o limite máximo
        descricaoInput.value = descricaoInput.value.substring(0, maxLength);
    }

    // Atualiza o texto da pré-visualização da descrição
    document.getElementById('preview-descricao').innerText = descricaoInput.value || 'Descrição do livro...';
    
    // Obtém o número de caracteres digitados no campo de descrição
    const charCount = descricaoInput.value.length;
    // Atualiza o texto do elemento de contagem de caracteres
    charCountDisplay.textContent = `${charCount} caracteres`;
});
