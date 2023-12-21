const mongoose = require('mongoose');

// Definir el esquema para las rutas
const routeSchema = new mongoose.Schema({
    origin: String,          // Origen de la ruta (por ejemplo, Caracas)
    destination: String,     // Destino de la ruta (por ejemplo, San Cristóbal)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',          // Referencia al modelo de usuarios
        required: true
    }
});

// Registrar el modelo 'Route' en la base de datos con el esquema definido
const Route = mongoose.model('Route', routeSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Route;