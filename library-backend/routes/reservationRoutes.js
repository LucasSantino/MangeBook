const express = require('express');
const { createReservation } = require('../controllers/reservationControllers');
const { getUserReservations } = require('../controllers/reservationControllers');
const { returnBook } = require('../controllers/reservationControllers');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Rota para criar uma reserva
router.post('/:bookId', verifyToken, createReservation);

// Rota para devolver um livro
router.post('/:reservationId/return', verifyToken, returnBook);

// Rota para obter as reservas de um usuário
router.get('/user/reservations', verifyToken, getUserReservations)

module.exports = router;
