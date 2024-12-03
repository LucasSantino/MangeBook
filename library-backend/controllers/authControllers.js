const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Função para registrar novos usuários
exports.register = async (req, res) => {
    const { username, birthDate, gender, cpf, address, email, password, userThumbnail } = req.body;

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
            userThumbnail
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





// Função para fazer login de usuários
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, forneça ambos os campos: email e senha.' });
    }

    try {
        // Busca o usuário pelo email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        console.log('Usuário encontrado:', user);  // Verificando os dados do usuário
        console.log('Senha fornecida:', password);  // Verificando a senha fornecida na requisição

        // Verificando o hash armazenado no banco de dados
        console.log('Senha armazenada (hash):', user.password);

        // Remover espaços em branco extras antes de comparar
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        
        // Verificando o resultado da comparação
        console.log('Resultado da comparação de senhas (isMatch):', isMatch);

        if (!isMatch) {
            console.log('Senha incorreta');
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        console.log('Senha correta');

        // Cria um JWT Token se as credenciais forem corretas
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token para o cliente
        res.status(200).json({ message: "Login realizado", token });
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



// Função para listar usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username'); // Retorna apenas os nomes de usuário
        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};




/*
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Função para registrar novos usuários
// Função para registrar novos usuários
exports.register = async (req, res) => {
    const { username, password, birthDate, gender, cpf, address, email, userThumbnail } = req.body;

    try {
        // Verifica se o usuário, e-mail ou CPF já existem
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        const existingCpf = await User.findOne({ cpf });

        if (existingUser) {
            return res.status(400).json({ error: 'Nome de usuário já está em uso' });
        }

        if (existingEmail) {
            return res.status(400).json({ error: 'E-mail já está em uso' });
        }

        if (existingCpf) {
            return res.status(400).json({ error: 'CPF já está cadastrado' });
        }

        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const newUser = new User({
            username,
            birthDate,
            gender,
            cpf,
            address,
            email,
            password: hashedPassword,
            userThumbnail
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};


// Função para fazer login de usuários com email e senha
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca o usuário pelo email
        const user = await User.findOne({ email });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Compara a senha fornecida com a senha armazenada no banco
        const isMatch = await bcrypt.compare(password, user.password);

        // Verifica se a senha está correta
        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Cria o token JWT para autenticação
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Expiração de 1 hora
        );

        // Retorna o token de autenticação e dados básicos do usuário
        res.status(200).json({ 
            message: 'Login realizado com sucesso', 
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username // Inclua aqui os campos que deseja retornar
            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};



/*const User = require('../models/user')
const bcrypt = require('bcryptjs'); // Importa bcrypt para hash de senhas
const jwt = require('jsonwebtoken'); // Importa jsonvebtoken para criar tokens JWT
require("dotenv").config();
 
// Função para registrar novos usuários

exports.register = async (req, res) => {
    const { username, password } = req.body;
        try {
            // Verifica se o usuário já existe
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }
    
            // Criptografa a senha antes de salvar no banco
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Cria um novo usuário
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (error) {
            console.error(error); // Loga o erro
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    };

// Função para fazer login de usuários
exports.login = async (req, res) => {
     const { username, password } = req.body; // Pega dados do corpo da requisição
 
     try {
         // Busca o usuário pelo nome de usuário
         const user = await User.findOne({ username });
 
         if (!user) return res.status(400).json({ error: 'Usuário não encontrado' }); // Retorna erro
 
         // Compara a senha fornecida com a senha armazenada no banco
         const isMatch = await bcrypt.compare(password, user.password);
 
         if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' }); // Retorna erro se a senha não corresponder
 
         // Cria o token JWT para autenticação
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
 
         res.json({ token }); // Responde com o token JWT
     } catch (error) { 
         console.error(error)
         res.status(500).json({ error: 'Erro ao fazer login' }); // Responde com erro ao fazer login
     }
 };
 */