/*
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
*/

////////////////////////////////////////////////////////////////////////////////////
///codigo com autentificação de usuario.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Para servir arquivos estáticos
require('dotenv').config(); // Para carregar variáveis de ambiente do arquivo .env

// Inicialização do app
const app = express();
app.use(cors());

// Middleware para parsing de JSON (já configurado corretamente)
app.use(express.json()); // Garantindo que o express saiba como processar JSON no corpo da requisição

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao tentar conectar com o MongoDB:', err));

// Configuração para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importação das rotas
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

// Usando as rotas
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes); // Adiciona o prefixo `/api/auth` para rotas de autenticação

// Rota de teste inicial (opcional, pode remover se quiser)
app.get('/', (req, res) => {
    res.status(200).send('API está funcionando!');
});

// Adicionando log para depurar o corpo da requisição
app.use((req, res, next) => {
    console.log('Request Body:', req.body); // Log do corpo da requisição para depuração
    next(); // Passa o controle para o próximo middleware
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

 