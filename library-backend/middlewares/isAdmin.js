// middlewares/isAdmin.js

// Middleware para verificar se o usuário é um administrador
const isAdmin = (req, res, next) => {
    console.log('Verificando papel do usuário:', req.user.role); // Log para verificar o papel do usuário
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar essa rota.' });
    }
    next(); // Se o usuário for admin, continua para a próxima etapa
};

module.exports = isAdmin;