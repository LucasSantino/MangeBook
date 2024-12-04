const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Função para registrar novos usuários
exports.register = async (req, res) => {
    const { username, birthDate, gender, cpf, address, email, password, userThumbnail, role } = req.body;

    // Verifica se o campo 'password' está presente e não é vazio
    if (!password) {
        return res.status(400).json({ error: 'Senha não fornecida' });
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
        console.log('Senha criptografada gerada:', hashedPassword); // Loga o hash gerado

        // Cria um novo usuário com o campo password após o campo email
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
        console.log('Usuário registrado com sucesso, senha armazenada no banco:', newUser.password); // Verifica o hash armazenado

        // Retorna a mensagem de sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Loga o erro
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};


// Função para registrar novos usuários (apenas administradores podem usar)
exports.adminRegister = async (req, res) => {
    const { username, birthDate, gender, cpf, address, email, password, userThumbnail, role } = req.body;

    // Verifica se o campo 'password' está presente e não é vazio
    if (!password) {
        return res.status(400).json({ error: 'Senha não fornecida' });
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
        console.log('Senha criptografada gerada:', hashedPassword); // Loga o hash gerado

        // Cria um novo usuário com o campo password após o campo email
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
        console.log('Usuário registrado com sucesso, senha armazenada no banco:', newUser.password); // Verifica o hash armazenado

        // Retorna a mensagem de sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso pelo administrador' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Loga o erro
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




// Função para atualizar informações do usuário
exports.updateUser = async (req, res) => {
    const { userId } = req.params; // ID do usuário a ser atualizado
    const updates = req.body; // Dados a serem atualizados (enviados no corpo da requisição)

    // Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Itera sobre os campos que foram enviados no corpo da requisição
    Object.keys(updates).forEach((key) => {
        if (updates[key]) {
            user[key] = updates[key];  // Atualiza o campo se o valor for fornecido
        }
    });

    try {
        // Salva as alterações no banco de dados
        await user.save();
        res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário' });
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
        const users = await User.find({}, 'username'); // Retorna apenas os nomes de usuário
        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Função para listar os usuários pelo nome ou pelo ID
exports.getUserByNameOrId = async (req, res) => {
    const { username, userId } = req.query; // Recebe os parâmetros da consulta

    try {
        let user;

        // Busca pelo ID, caso fornecido
        if (userId) {
            user = await User.findById(userId);
        }
        // Busca pelo nome, caso fornecido
        else if (username) {
            user = await User.findOne({ username: username.trim() });
        }

        // Caso o usuário não seja encontrado
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
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





