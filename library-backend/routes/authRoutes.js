const express = require('express'); // Importa o express
const router = express.Router(); // Cria um roteador do express
const authController = require('../controllers/authControllers'); // Corrigir a importação para usar o nome correto


// Rota para registrar novos usuários
router.post('/register', authController.register); // Usando o controlador correto

// Rota para login de usuários
router.post('/login', authController.login); // Usando o controlador correto

// Rota para listar todos os usuários
router.get('/users', authController.getAllUsers); // Usando o controlador correto

router.put('/:userId', authController.updateUser);



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