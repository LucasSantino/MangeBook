const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    genre: { type: String, required: true },
    isbn: { type: String }, // Remover a linha de comentário se necessário
    copies: { type: Number, required: true },
    description: { type: String, required: true },
    bookThumbnail: { type: String },  // Supondo que bookThumbnail é uma string com o caminho ou URL da imagem
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
