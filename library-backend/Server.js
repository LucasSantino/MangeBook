const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Para servir arquivos estáticos
require('dotenv').config(); // Para carregar variáveis de ambiente do arquivo .env

// Inicialização do app
const app = express();
app.use(cors());

// Middleware para parsing de JSON (já configurado corretamente) // Garantindo que o express saiba como processar JSON no corpo da requisição
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

// Importação das rotas
const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

// Usando as rotas
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes); 

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

 