const express = require('express'); // Importa o express
const router = express.Router(); //  roteador do express
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin');
const authController = require('../controllers/authControllers'); 

// Rota para fazer login de usuários
router.post('/login', authController.login); 

// Rota para registrar novos usuários
router.post('/register', authController.register); 

// Rota para registrar de novos usuários (pelo administrador)
router.post('/admin/register', verifyToken, isAdmin, authController.adminRegister);

// Rota para atualizar as informações do usuário (só pode atualizar suas próprias informações ou administradores podem atualizar qualquer usuário)
router.put('/:userId', verifyToken, authController.updateUser); 

// Rota para ativar/desativar usuários (somente administradores)
router.patch('/users/:userId/toggle-status', verifyToken, isAdmin, authController.toggleUserStatus);

// Rota para alterar o papel do usuário promover ou rebaixar (somente administradores podem acessar)
router.put('/users/role/:userId', verifyToken, isAdmin, authController.changeUserRole);

// Rota para listar todos os usuários  (somente administradores podem acessar)
router.get('/users', verifyToken, isAdmin, authController.getAllUsers); // Rota protegida

// Rota para buscar por nome ou ID de usuario (somente administradores podem acessar)
router.get('/search', verifyToken, isAdmin, authController.getUserByNameOrId); // Rota protegida

// Rota para deletar um usuário (somente administradores podem acessar)
router.delete('/users/:id', verifyToken, isAdmin, authController.deleteUser); // Rota protegida




module.exports = router; // Exporta o roteador para uso no app.js
