const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number},
    genre:{type:String, required:true},
    ISBN:{type: String, required: true},
    copies:{type:Number, required:true},
    description:{type:String, required: true},
    coverImage: { type: String },
    reviews: [
        {
            // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            rating: { type: Number }, // Referência para o livro
            comment: { type: String },
            reviewsDate: { type: Date },
        },
    ],
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
