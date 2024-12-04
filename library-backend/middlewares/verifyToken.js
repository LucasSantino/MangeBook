// middlewares/verifyToken.js

const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    // Verifica se o token está no cabeçalho "Authorization" da requisição
    const token = req.header('Authorization')?.split(' ')[1]; // Extrai o token da autorização no cabeçalho

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    try {
        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token com a chave secreta
        req.user = decoded; // Armazena o usuário decodificado na requisição
        next(); // Se o token for válido, continua para a próxima etapa
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

module.exports = verifyToken;
