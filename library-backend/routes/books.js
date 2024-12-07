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

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Filtrar apenas arquivos de imagem
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de tamanho: 5MB
}); 

//// *** CRIAÇÃO (POST) ***////
router.post('/', upload.single('bookThumbnail'), async (req, res) => {
    const { bookTitle, bookAuthor, publicationYear, bookGenre, isbn, copiesAvailable, dbookDescription } = req.body;

    // Se a imagem foi enviada, incluímos o caminho dela no objeto
    const bookThumbnail = req.file ? req.file.path : null;

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
        res.status(500).json({ message: 'Erro ao buscar livros', error });
    }
});


// *** LEITURA (GET LIVRO POR ID) ***
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Busca o livro pelo ID
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json(book); // Retorna o livro encontrado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livro', error });
    }
});

// *** ATUALIZAÇÃO (PUT) ***
router.put('/:id', upload.single('bookThumbnail'), async (req, res) => {
    // Extraímos os dados enviados no corpo da requisição
    const { bookTitle, bookAuthor, publicationYear, bookGenre, isbn, copiesAvailable, dbookDescription } = req.body;

    // Verificamos se uma nova imagem foi enviada
    const bookThumbnail = req.file ? req.file.path : null;

    // Tentamos atualizar o livro no banco de dados pelo ID
    try {
        // Atualiza o livro com os dados fornecidos
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, // Procuramos pelo ID do livro
            {
                bookTitle,       // Atualiza o título
                bookAuthor,      // Atualiza o autor
                publicationYear, // Atualiza o ano de publicação
                bookGenre,       // Atualiza o gênero
                isbn,            // Atualiza o ISBN
                copiesAvailable, // Atualiza a quantidade de cópias disponíveis
                dbookDescription, // Atualiza a descrição
                bookThumbnail    // Atualiza o caminho da imagem (se houver)
            },
            { new: true } // A opção { new: true } garante que o documento retornado seja o atualizado
        );

        // Caso o livro não seja encontrado, retornamos um erro
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Retornamos o livro atualizado
        res.status(200).json(updatedBook);
    } catch (error) {
        // Caso haja algum erro, retornamos uma resposta de erro 500
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
});

// *** EXCLUSÃO (DELETE) ***
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id); // Deletamos o livro pelo ID
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error });
    }
});

// Tratamento de erros do Multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: `Erro de upload: ${err.message}` });
    } else if (err) {
        res.status(500).json({ error: err.message });
    } else {
        next();
    }
});

// Exportamos o roteador para ser usado no server.js
module.exports = router;
