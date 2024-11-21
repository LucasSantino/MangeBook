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

/* codigo anterior
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

//Conexão ao MongoDB
mongoose.connect('mongodb+srv://SantinoLucas:relampago@library.fetwz.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importação das rotas
const booksRoutes = require('./routes/books');
app.use('/api/books', booksRoutes);

// Definir a porta do servidor
app.listen(3000, () => {
console.log('Servidor rodando na porta 3000');
});

*/