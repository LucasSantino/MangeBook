const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    publicationYear: { type: Number },
    bookGenre: { type: String, required: true },
    isbn: { type: String }, // Remover a linha de comentário se necessário
    copiesAvailable: { type: Number, required: true },
    dbookDescription: { type: String, required: true },
    bookThumbnail: { type: String },  // Supondo que bookThumbnail é uma string com o caminho ou URL da imagem
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);

