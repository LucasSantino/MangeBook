const express = require('express'); // Importamos o Express
const Book = require('../models/Book'); // Importamos o modelo Book
const multer = require('multer'); // Importamos o Multer
const path = require('path'); // Para ajudar a lidar com caminhos de arquivos
const router = express.Router(); // Criamos o roteador

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Armazenar as imagens na pasta 'uploads'
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Obter a extensão do arquivo
        cb(null, Date.now() + fileExtension); // Usar timestamp como nome do arquivo
    }
});

const upload = multer({ storage: storage }); // Criando o middleware de upload com a configuração

// *** CRIAÇÃO (POST) ***
router.post('/', upload.single('bookThumbnail'), async (req, res) => {
    const { bookTitle, bookAuthor, publicationYear, bookGenre, isbn, copiesAvailable, dbookDescription } = req.body; // Extraímos os dados da requisição

    // Se a imagem foi enviada, podemos incluir o caminho dela no objeto
    const bookThumbnail = req.file ? req.file.path : null;  // Salva o caminho do arquivo

    try {
        const newBook = new Book({ 
            bookTitle, 
            bookAuthor, 
            publicationYear, 
            bookGenre, 
            isbn, 
            copiesAvailable, 
            dbookDescription, 
            bookThumbnail 
        }); // Criamos e salvamos o livro
        await newBook.save();
        res.status(201).json(newBook); // Retornamos o livro criado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

// *** LEITURA (GET) ***
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Buscamos todos os livros
        res.status(200).json(books); // Retornamos a lista de livros 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros', error }); // Retornamos erro, se houver
    }
});

// *** ATUALIZAÇÃO (PUT) ***
router.put('/:id', async (req, res) => {
    const { title, author, year } = req.body; // Extraímos os novos dados
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true }); // Atualizamos o livro pelo ID
        res.status(200).json(updatedBook); // Retornamos o livro atualizado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error }); // Retornamos erro, se houver
    }
});

// *** EXCLUSÃO (DELETE) ***
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id); // Deletamos o livro pelo ID
        res.status(200).json({ message: 'Livro deletado com sucesso' }); // Retornamos mensagem de sucesso
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error }); // Retornamos erro, se houver
    }
});

// Exportamos o roteador para ser usado no server.js
module.exports = router;


/*
const express = require('express'); // Importamos o Express
const Book = require('../models/Book'); // Importamos o modelo Book
const router = express.Router(); // Criamos o roteador

// *** CRIAÇÃO (POST) ***
router.post('/', async (req, res) => {
    const { title, author, year, genre, isbn, copies, description, } = req.body; // Extraimos os dados da requisição
    try {
        const newBook = new Book({  title, author, year, genre, isbn, copies, description }); // Criamos e salvamos o livro
        await newBook.save();
        res.status(201).json(newBook); // Retornamos o livro criado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

// *** LEITURA (GET) ***
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Buscamos todos os livros
        res.status(200).json(books); // Retornamos a lista de livros 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros', error }); // Retornamos erro, se houver
    }
});

// *** ATUALIZAÇÃO (PUT) ***
router.put('/:id', async (req, res) => {
    const { title, author, year } = req.body; // Extraimos os novos dados
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true }); // Atualizamos o livro pelo ID
        res.status(200).json(updatedBook); // Retornamos o livro atualizado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error }); // Retornamos erro, se houver
    }
});

// ***  EXCLUSÃO (DELETE) ***
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id); // Deletamos o livro pelo ID
        res.status(200).json({ message: 'Livro deletado com sucesso' }); // Retornamos mensagem de sucesso
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error }); // Retornamos erro, se houver
    }
});

// Exportamos o roteador para ser usado no server.js
module.exports = router;
*/