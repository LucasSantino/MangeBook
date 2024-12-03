const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para criptografar a senha

// Define o esquema do usuário
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: [true, 'O nome de usuário é obrigatório'], unique: true, trim: true },
        birthDate: { type: Date, required: [true, 'A data de nascimento é obrigatória'] },
        gender: { type: String, enum: ['masculino', 'feminino', 'outro'], required: [true, 'O gênero é obrigatório'] },
        cpf: { type: String, required: [true, 'O CPF é obrigatório'], unique: true },
        address: { type: String, required: [true, 'O endereço é obrigatório'] },
        email: { type: String, required: [true, 'O e-mail é obrigatório'], unique: true, match: [/.+@.+\..+/, 'Por favor, insira um e-mail válido'] },
        password: { type: String, required: [true, 'A senha é obrigatória'] },
        userThumbnail: { type: String } // URL ou path da imagem do usuário
    },
    { timestamps: true } // Adiciona automaticamente os campos createdAt e updatedAt
);

// Método para comparar a senha fornecida com a armazenada
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);  // Compara a senha fornecida com a senha criptografada
    } catch (error) {
        throw new Error('Erro ao comparar as senhas');
    }
};


// Exporta o modelo do usuário
module.exports = mongoose.model('User', userSchema);



/*
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para criptografar a senha

// Define o esquema do usuário
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: [true, 'O nome de usuário é obrigatório'], nique: true, trim: true },
        password: { type: String, required: [true, 'A senha é obrigatória']},
    },
    {
        timestamps: true, // Adiciona automaticamente os campos createdAt e updatedAt
    }
);

// Método para comparar a senha fornecida com a armazenada
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Hook para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    // Se a senha não foi modificada, continua o fluxo
    if (!this.isModified('password')) return next();

    try {
        // Criptografa a senha com um fator de custo de 10
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error); // Passa o erro ao middleware de erro
    }
});

module.exports = mongoose.model('User', userSchema);
*/


