const express = require('express'); // Importa o express
const router = express.Router(); //  roteador do express
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin');
const authController = require('../controllers/authControllers'); 


// Rota para registrar novos usuários
router.post('/register', authController.register); 

// Rota para fazer login de usuários
router.post('/login', authController.login); 

// Rota para atualizar as informações do usuário (só pode atualizar suas próprias informações ou administradores podem atualizar qualquer usuário)
router.put('/:userId', verifyToken, authController.updateUser); 

// Rota para listar todos os usuários  (somente administradores podem acessar)
router.get('/users', verifyToken, isAdmin, authController.getAllUsers); // Rota protegida

// Rota para buscar por nome ou ID de usuario (somente administradores podem acessar)
router.get('/search', verifyToken, isAdmin, authController.getUserByNameOrId); // Rota protegida


// Rota para deletar um usuário (somente administradores podem acessar)
router.delete('/users/:id', verifyToken, isAdmin, authController.deleteUser); // Rota protegida




module.exports = router; // Exporta o roteador para uso no app.js






/*const express = require('express'); // Importa o Express
const router = express.Router(); // Cria um roteador do Express
const authController = require('../controllers/authController')

// Rota para registrar novos usuários
router.post('/register', authController.register);

// Rota para login de usuários
router.post('/login', authController.login);

module.exports = router; // Exporta o roteador para uso no app.js
*/