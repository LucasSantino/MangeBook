// middlewares/isAdmin.js

// Middleware para verificar se o usuário é um administrador
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar essa rota.' });
    }
    next(); // Se o usuário for admin, continua para a próxima etapa
};

module.exports = isAdmin;