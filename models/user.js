// Importar la biblioteca de mongoose para la conexión y definición del modelo
const mongoose = require('mongoose');

// Definir el esquema (schema) de la base de datos para los usuarios
const userSchema = new mongoose.Schema({
    name: String,                   // Nombre del usuario
    email: String,                  // Correo electrónico del usuario
    password: String,               // Contraseña del usuario
    isAdmin: {
        type: Boolean,
        default: false               // Valor predeterminado para la verificación del usuario
    },
    verified: {
        type: Boolean,
        default: false               // Valor predeterminado para la verificación del usuario
    },
    verificationCode: String        // Código de verificación almacenado temporalmente
});

// Configurar la transformación de la respuesta del usuario al formato deseado
userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;    // Eliminar la propiedad _id
        delete returnObject.__v;    // Eliminar la versión interna de mongoose (__v)
        delete returnObject.password; // Eliminar la contraseña para seguridad
    }
});

// Registrar el modelo 'User' en la base de datos con el esquema definido
const User = mongoose.model('User', userSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = User;
