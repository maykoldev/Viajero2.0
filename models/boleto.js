const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define el esquema para los Boletos de viaje
const boletoSchema = new mongoose.Schema({
  boletoId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proveedor', // Asegúrate de tener el modelo correcto para la empresa de transporte
    required: true,
  },
  pasajero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pasajero', // Asegúrate de tener el modelo correcto para el pasajero
    required: true,
  },
  fechaViaje: {
    type: Date,
    required: true,
  },
  horaViaje: {
    type: String,
    required: true,
  },
  origen: String,
  destino: String,
  numeroAsiento: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pagado', 'reservado'],
    default: 'reservado',
  },
});

// Configura la transformación de la respuesta del Boleto al formato deseado
boletoSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  }
});

// Registrar el modelo 'Boleto' en la base de datos con el esquema definido
const Boleto = mongoose.model('Boleto', boletoSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Boleto;
