// Importar la biblioteca de mongoose para la conexión y definición del modelo
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Definir el esquema (schema) de la base de datos para los Pasajeroes
const pasajeroSchema = new mongoose.Schema({
    PasajeroId: {
        type: String,
        default: uuidv4, // Generar un ID único usando uuidv4 como valor predeterminado
        unique: true,
    },
    cedula:String,
    nombre:String,
    apellido:String,
    fechaNacimiento:String,
    genero:String,
    correo:String,
    telefono:String,
});

// Configurar la transformación de la respuesta del Pasajero al formato deseado
pasajeroSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;    // Eliminar la propiedad _id
        delete returnObject.__v;    // Eliminar la versión interna de mongoose (__v)
        // No eliminar el porcentajeGanancia si deseas que se incluya en la respuesta
    }
});

// Registrar el modelo 'Pasajero' en la base de datos con el esquema definido
const Pasajero = mongoose.model('Pasajero', pasajeroSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Pasajero;
