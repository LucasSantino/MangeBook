document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.user-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Obtém os valores das senhas
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        // Verifica se as senhas correspondem
        if (senha !== confirmarSenha) {
            alert('As senhas não correspondem. Por favor, tente novamente.');
            return; // Não continua se as senhas não forem iguais
        }

        // Obtém os dados do formulário
        const userData = {
            id: document.getElementById('id').value,
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            dataNascimento: document.getElementById('dataNascimento').value,
            cpf: document.getElementById('cpf').value,
            endereco: document.getElementById('endereco').value,
            senha: senha,
            tipoUsuario: document.getElementById('tipoUsuario').value,
            thumbnail: document.getElementById('thumbnail').files[0] // Se for necessário
        };

        // Aqui você pode adicionar a lógica para enviar os dados para um servidor
        // Exemplo: usando fetch ou AJAX

        // Exibe o popup de sucesso
        alert('Cadastro Realizado com sucesso');

        // Se você quiser, pode resetar o formulário
        this.reset();
    });
});
