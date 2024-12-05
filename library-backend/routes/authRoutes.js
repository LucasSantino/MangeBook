const express = require('express'); // Importa o express
const router = express.Router(); //  roteador do express
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const authController = require('../controllers/authControllers'); 
const { upload } = require('../Server');

// Certifique-se de importar a função updateUser
const { updateUser } = require('../controllers/authControllers'); 

// Rota para fazer login de usuários
router.post('/login', authController.login); 

// Rota para registrar novos usuários
router.post('/register', upload.single('userThumbnail'), authController.register);

// Rota para registrar de novos usuários (pelo administrador)
router.post('/admin/register', verifyToken, isAdmin, upload.single('userThumbnail'), authController.adminRegister);

// Rota para atualizar as informações do usuário
router.put('/update/:userId', verifyToken, upload.single('userThumbnail'), updateUser);

// Rota para ativar/desativar usuários (somente administradores)
router.patch('/users/:userId/toggle-status', verifyToken, isAdmin, authController.toggleUserStatus);

// Rota para alterar o papel do usuário (promover ou rebaixar, somente administradores podem acessar)
router.put('/users/role/:userId', verifyToken, isAdmin, authController.changeUserRole);

// Rota para listar todos os usuários  (somente administradores podem acessar)
router.get('/users', verifyToken, isAdmin, authController.getAllUsers); // Rota protegida

// Rota para buscar por nome ou ID de usuário (usuários podem acessar seus próprios dados, administradores podem acessar qualquer um)
router.get('/search', verifyToken, authController.getUserByNameOrId);

// Rota para deletar um usuário (somente administradores podem acessar)
router.delete('/users/:id', verifyToken, isAdmin, authController.deleteUser); // Rota protegida

module.exports = router; 
