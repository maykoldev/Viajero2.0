// Importar la biblioteca de mongoose para la conexión y definición del modelo
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Definir el esquema (schema) de la base de datos para los proveedores
const proveedorSchema = new mongoose.Schema({
    proveedorId: {
        type: String,
        default: uuidv4, // Generar un ID único usando uuidv4 como valor predeterminado
        unique: true,
    },
    logo:Buffer,
    razonSocial: String,            // Razón Social del proveedor
    rif: String,                    // RIF del proveedor
    ruta:String,                   // Rutas de viaje ofrecidas por el proveedor
    fecha:String,                  //fecha de salida por el proveedor
    telefono: String,               // Teléfono del proveedor
    correo: String,                 // Correo electrónico del proveedor
    porcentajeGanancia: String,     // Porcentaje de ganancia del proveedor
    // Puedes agregar más campos según las necesidades de tu aplicación
});

// Configurar la transformación de la respuesta del proveedor al formato deseado
proveedorSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;    // Eliminar la propiedad _id
        delete returnObject.__v;    // Eliminar la versión interna de mongoose (__v)
        // No eliminar el porcentajeGanancia si deseas que se incluya en la respuesta
    }
});

// Registrar el modelo 'Proveedor' en la base de datos con el esquema definido
const Proveedor = mongoose.model('Proveedor', proveedorSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Proveedor;
