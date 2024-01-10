// Importar la biblioteca de mongoose para la conexión y definición del modelo
const mongoose = require('mongoose');

// Definir el esquema (schema) de la base de datos para las rutas
const rutaSchema = new mongoose.Schema({
    nombre: String,
    origen: String,
    destino: String,
});


// Configurar la transformación de la respuesta de la ruta al formato deseado
rutaSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;    // Eliminar la propiedad _id
        delete returnObject.__v;    // Eliminar la versión interna de mongoose (__v)
        // No eliminar la distancia si deseas que se incluya en la respuesta
    }
});

// Registrar el modelo 'Ruta' en la base de datos con el esquema definido
const Ruta = mongoose.model('Ruta', rutaSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Ruta;
