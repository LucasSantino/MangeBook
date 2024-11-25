const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para criptografar a senha

// Define o esquema do usuário
const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: [true, 'O nome de usuário é obrigatório'], 
            unique: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: [true, 'A senha é obrigatória'] 
        },
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



/*const mongoose = require('mongoose');

// Define o esquema de usuário

const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true }, // Nome de usuário obrigatório e único
password: { type: String, required: true }, // Senha obrigatória
})

// Exporta o modelo de usuário

module.exports = mongoose.model('User', userSchema);
*/