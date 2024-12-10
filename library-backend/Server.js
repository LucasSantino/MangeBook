const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer'); // Importa o multer
require('dotenv').config(); // Para carregar variáveis de ambiente do arquivo .env

// Inicialização do app
const app = express();
app.use(cors());

// Middleware para parsing de JSON 
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao tentar conectar com o MongoDB:', err));

// Configuração para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório de destino para as imagens
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para cada imagem
    },
});

// Configuração do Multer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Arquivo deve ser uma imagem (png, jpg, jpeg)'), false);
        }
    },
});

// Exporta o middleware 'upload'
module.exports = { app, upload };


// Middleware de tratamento de erros para upload
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Erro no upload: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

// Importação das rotas
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/authRoutes');

// Usando as rotas
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);

const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);


// Rota para registro de usuário com upload (não duplicar em authRoutes)
app.post('/api/auth/register', upload.single('userThumbnail'), require('./controllers/authControllers').register);

// Rota de teste inicial (opcional)
app.get('/', (req, res) => {
    res.status(200).send('API está funcionando!');
});

// Adicionando log para depurar o corpo da requisição
app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
