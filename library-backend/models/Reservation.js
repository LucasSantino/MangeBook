const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Referência ao modelo Book
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo User
    required: true,
  },
  reservationDate: {
    type: Date,
    default: Date.now, // Data em que a reserva foi feita
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'], // Status da reserva
    default: 'active',
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
