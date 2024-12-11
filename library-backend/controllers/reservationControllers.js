const Reservation = require('../models/Reservation');
const Book = require('../models/Book');


// Post - Para o usario Reservar livros
exports.createReservation = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id; // ID do usuário autenticado

    // Verificar se o livro existe e há cópias disponíveis
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    if (book.copiesAvailable <= 0) {
      return res.status(400).json({ error: 'Cópias indisponíveis para reserva.' });
    }

    // Criar uma nova reserva
    const reservation = new Reservation({
      book: bookId,
      user: userId,
    });
    await reservation.save();

    // Atualizar o número de cópias disponíveis no livro
    book.copiesAvailable -= 1;
    await book.save();

    res.status(201).json({ message: 'Reserva criada com sucesso.', reservation });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a reserva.', details: error.message });
  }
};

//Put - Retornar livros reservados
exports.returnBook = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = req.user.id; // ID do usuário autenticado

    // Encontrar a reserva
    const reservation = await Reservation.findById(reservationId).populate('book');
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    // Verificar se o usuário é o proprietário da reserva
    if (reservation.user.toString() !== userId) {
      return res.status(403).json({ error: 'Você não pode devolver este livro.' });
    }

    // Atualizar o status da reserva para "completed"
    reservation.status = 'completed';
    await reservation.save();

    // Atualizar o número de cópias disponíveis do livro
    const book = reservation.book;
    book.copiesAvailable += 1;
    await book.save();

    res.status(200).json({ message: 'Livro devolvido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao devolver o livro.', details: error.message });
  }
};

// Get de retorno de informações dos livros reservados
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário autenticado

    // Buscar todas as reservas associadas ao usuário
    const reservations = await Reservation.find({ user: userId }).populate('book');
    
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: 'Você não tem reservas feitas.' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as reservas.', details: error.message });
  }
};