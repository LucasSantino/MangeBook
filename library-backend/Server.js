const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // Para lidar com caminhos de arquivos

// Inicialização do app
const app = express();

// Configurações do Multer para o upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define a pasta onde as imagens serão salvas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo como timestamp + extensão
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve arquivos estáticos da pasta 'uploads'

// Conexão ao MongoDB
mongoose.connect('mongodb+srv://SantinoLucas:relampago@library.fetwz.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importação das rotas
const booksRoutes = require('./routes/books');
app.use('/api/books', booksRoutes);

// **Rota para upload de imagem**
app.post('/upload', upload.single('bookThumbnail'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.status(200).json({
        message: 'Imagem carregada com sucesso!',
        file: req.file,
    });
});

// Definir a porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

////////////////////////////////////////////////////////////////////////////////////
/* codigo com autentificação de usuario.
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path'); // Para lidar com caminhos de arquivos
const multer = require('multer');
const User = require('./models/user'); // Modelo do usuário
const Book = require('./models/book'); // Modelo de livros

// Inicializa o app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve arquivos estáticos da pasta 'uploads'

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://SantinoLucas:relampago@library.fetwz.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define o local de armazenamento das imagens
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nomeia o arquivo com timestamp
    }
});

const upload = multer({ storage: storage });

// **Rota de Cadastro de Usuário**
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo usuário
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Salva o usuário no banco
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

// **Rota de Login de Usuário**
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca o usuário no banco de dados
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// **Middleware de Autenticação JWT**
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

// **Rotas de livros**

app.get('/api/books', authenticate, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar livros' });
    }
});

app.post('/api/books', authenticate, async (req, res) => {
    const { title, author, description } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            description
        });

        await newBook.save();
        res.status(201).json({ message: 'Livro criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar livro' });
    }
});

app.put('/api/books/:id', authenticate, async (req, res) => {
    const { title, author, description } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, description },
            { new: true }
        );
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
});

app.delete('/api/books/:id', authenticate, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Livro excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir livro' });
    }
});

// **Rota para upload de imagem** (protege com autenticação, se necessário)
app.post('/upload', authenticate, upload.single('bookThumbnail'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.status(200).json({
        message: 'Imagem carregada com sucesso!',
        file: req.file,
    });
});

// Define a porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
*/
