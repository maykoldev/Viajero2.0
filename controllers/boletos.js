// controllers/boletoController.js
const boletosRouter= require('../models/boleto');
const Pasajero = require('../models/pasajero');
const Proveedor = require('../models/proveedor');


exports.crearBoleto = async (req, res) => {
  try {
    const {
      proveedorId,
      pasajeroId,
      fechaViaje,
      horaViaje,
      origen,
      destino,
      numeroAsiento,
      precio,
    } = req.body;

    const empresaTransporte = await Proveedor.findById(proveedorId);
    const pasajero = await Pasajero.findById(pasajeroId);

    if (!empresaTransporte || !pasajero) {
      return res.status(404).json({ mensaje: 'Empresa de transporte o pasajero no encontrado' });
    }

    const nuevoBoleto = new Boleto({
      proveedor: empresaTransporte._id,
      pasajero: pasajero._id,
      fechaViaje,
      horaViaje,
      origen,
      destino,
      numeroAsiento,
      precio,
    });

    await nuevoBoleto.save();

    res.status(201).json(nuevoBoleto);
  } catch (error) {
    console.error('Error al crear el boleto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.obtenerBoletos = async (req, res) => {
  try {
    const boletos = await Boleto.find().populate('proveedor pasajero');
    res.status(200).json(boletos);
  } catch (error) {
    console.error('Error al obtener los boletos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.actualizarBoleto = async (req, res) => {
  try {
    const { boletoId } = req.params;
    const actualizaciones = req.body;

    const boleto = await Boleto.findByIdAndUpdate(boletoId, actualizaciones, { new: true });

    if (!boleto) {
      return res.status(404).json({ mensaje: 'Boleto no encontrado' });
    }

    res.status(200).json(boleto);
  } catch (error) {
    console.error('Error al actualizar el boleto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.eliminarBoleto = async (req, res) => {
  try {
    const { boletoId } = req.params;

    const boletoEliminado = await Boleto.findByIdAndDelete(boletoId);

    if (!boletoEliminado) {
      return res.status(404).json({ mensaje: 'Boleto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Boleto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el boleto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = boletosRouter;