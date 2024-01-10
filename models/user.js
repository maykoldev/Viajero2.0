const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Definir el esquema (schema) de la base de datos para los usuarios
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4, // Generar un ID único usando uuidv4 como valor predeterminado
        unique: true,
    },
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: String,
});

// Configurar la transformación de la respuesta del usuario al formato deseado
userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    }
});

// Registrar el modelo 'User' en la base de datos con el esquema definido
const User = mongoose.model('User', userSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = User;

