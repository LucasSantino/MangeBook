const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path'); // Importa o módulo path


exports.register = async (req, res) => {
    const { username, birthDate, gender, cpf, address, email, password, confirmPassword } = req.body;

    // Processa o campo userThumbnail, que contém o caminho do arquivo salvo
    const userThumbnail = req.file ? req.file.path : null;

    // Verifica se o campo 'password' e 'confirmPassword' estão presentes e não são vazios
    if (!password || !confirmPassword) {
        return res.status(400).json({ error: 'Senha e confirmação de senha são obrigatórios' });
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Remove espaços em branco extras da senha
        const trimmedPassword = password.trim();

        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

        // Cria um novo usuário com os dados fornecidos
        const newUser = new User({
            username,
            birthDate,
            gender,
            cpf,
            address,
            email,
            password: hashedPassword, // Armazena a senha criptografada
            userThumbnail, // Salva o caminho da imagem
        });

        // Salva o usuário no banco de dados
        await newUser.save();

        // Retorna a mensagem de sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); 
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

  
// Função para registrar novos usuários (apenas administradores podem usar)
exports.adminRegister = async (req, res) => {
    try {
        const { username, birthDate, gender, cpf, address, email, password, confirmPassword, role } = req.body;

        // Processa o campo userThumbnail do Form Data (caso presente)
        const userThumbnail = req.file ? req.file.path : undefined;

        // Verifica se os campos 'password' e 'confirmPassword' estão presentes e não são vazios
        if (!password || !confirmPassword) {
            return res.status(400).json({ error: 'Senha e confirmação de senha são obrigatórios' });
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'As senhas não coincidem' });
        }

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Remove espaços em branco extras da senha
        const trimmedPassword = password.trim();

        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
        console.log('Senha criptografada gerada:', hashedPassword); // Loga o hash gerado

        // Cria um novo usuário com os dados fornecidos
        const newUser = new User({
            username,
            birthDate,
            gender,
            cpf,
            address,
            email,
            password: hashedPassword, // Armazena a senha criptografada
            userThumbnail,
            role: role || 'user' // Se não for fornecido, o papel será 'user' por padrão
        });

        // Salva o usuário no banco de dados
        await newUser.save();
        console.log('Usuário registrado com sucesso:', newUser);

        // Retorna a mensagem de sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso pelo administrador' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};




// Função para fazer login de usuários
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Verifica se os campos de email e senha foram fornecidos
    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, forneça ambos os campos: email e senha.' });
    }

    try {
        // Busca o usuário pelo email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        console.log('Usuário encontrado:', user);  // Loga os dados do usuário
        console.log('Senha fornecida:', password);  // Loga a senha fornecida

        // Verifica se o usuário está bloqueado
        if (!user.isActive) {
            return res.status(403).json({ error: 'Usuário bloqueado. Não é possível fazer login.' });
        }

        // Compara a senha fornecida com a armazenada no banco de dados
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        
        if (!isMatch) {
            console.log('Senha incorreta');
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        console.log('Senha correta');

        // Cria um JWT Token com o id e role do usuário, definindo o tempo de expiração para 1h
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token e as informações do usuário como resposta
        res.status(200).json({ message: "Login realizado", token, user });
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};


exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { username, birthDate, gender, cpf, address, email, password, userThumbnail } = req.body;

    try {
        // Busca o usuário pelo ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualiza os dados do usuário (sem a senha por enquanto)
        user.username = username || user.username;
        user.birthDate = birthDate || user.birthDate;
        user.gender = gender || user.gender;
        user.cpf = cpf || user.cpf;
        user.address = address || user.address;
        user.email = email || user.email;
        user.userThumbnail = userThumbnail || user.userThumbnail;

        // Se a senha foi fornecida, criptografe antes de salvar
        if (password) {
            const hashedPassword = await bcrypt.hash(password.trim(), 10);
            user.password = hashedPassword;
        }

        // Salva as alterações no banco de dados
        await user.save();

        res.status(200).json({ message: 'Perfil atualizado com sucesso', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o perfil' });
    }
};


// Função para ativar/desativar usuários
exports.toggleUserStatus = async (req, res) => {
    const { userId } = req.params; // Obtém o ID do usuário a partir dos parâmetros da rota

    try {
        // Busca o usuário no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Alterna o status de ativação
        user.isActive = !user.isActive;

        // Salva as alterações no banco
        await user.save();

        // Retorna a resposta ao cliente
        res.status(200).json({
            message: `Usuário ${user.isActive ? 'ativado' : 'desativado'} com sucesso.`,
            user: { id: user._id, username: user.username, isActive: user.isActive }
        });
    } catch (error) {
        console.error('Erro ao alterar o status do usuário:', error);
        res.status(500).json({ error: 'Erro ao alterar o status do usuário' });
    }
};


/// Função para alterar o papel do usuário (promover ou rebaixar)
exports.changeUserRole = async (req, res) => {
    const { userId } = req.params; // ID do usuário que terá o papel alterado
    const { role } = req.body; // Novo papel fornecido no corpo da requisição

    try {
        // Valida se o papel fornecido é válido
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Papel inválido. Use "admin" ou "user".' });
        }

        // Busca o usuário pelo ID
        const user = await User.findById(userId);

        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se o papel já é o mesmo fornecido
        if (user.role === role) {
            return res.status(400).json({ error: `O usuário já possui o papel "${role}".` });
        }

        // Atualiza o papel do usuário
        user.role = role;
        await user.save();

        res.status(200).json({ message: `Papel do usuário alterado para "${role}" com sucesso.`, user });
    } catch (error) {
        console.error('Erro ao alterar o papel do usuário:', error);
        res.status(500).json({ error: 'Erro ao alterar o papel do usuário' });
    }
};


// Função para listar todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retorna todos os campos de cada usuário
        res.status(200).json(users);  // Retorna todos os usuários com os dados completos
    } catch (error) {
        console.error(error);  // Loga o erro
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};


// Função para listar os usuários pelo nome ou pelo ID
exports.getUserByNameOrId = async (req, res) => {
    const { userId } = req.query; // Recebe o parâmetro da consulta

    try {
        // Se não houver um userId fornecido, retorna erro
        if (!userId) {
            return res.status(400).json({ error: 'userId é necessário' });
        }

        // Busca o usuário pelo ID fornecido
        let user = await User.findById(userId);

        // Caso o usuário não seja encontrado
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se o usuário é o mesmo que está tentando acessar
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' }); // Impede que um usuário acesse dados de outro
        }

        // Retorna os dados do usuário
        res.status(200).json(user);
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
};



// Função para deletar um usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário a ser deletado a partir dos parâmetros da rota

    try {
        // Tenta encontrar e deletar o usuário pelo ID
        const deletedUser = await User.findByIdAndDelete(id);

        // Se o usuário não for encontrado, retorna um erro
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Retorna uma mensagem de sucesso
        res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error); // Loga o erro
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
};





