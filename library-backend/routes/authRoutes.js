const express = require('express'); // Importa o express
const router = express.Router(); //  roteador do express
const authController = require('../controllers/authControllers'); 


// Rota para registrar novos usuários
router.post('/register', authController.register); 

// Rota para fazer login de usuários
router.post('/login', authController.login); 

// Rota para atualizar as informacões do usuario
router.put('/:userId', authController.updateUser);

// Rota para listar todos os usuários
router.get('/users', authController.getAllUsers);

// Rota para buscar por nome ou ID de usuario
router.get('/search', authController.getUserByNameOrId);


// Rota para deletar as informaçoes do usuario
router.delete('/:userId', authController.deleteUser);




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