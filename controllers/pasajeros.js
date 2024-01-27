const pasajerosRouter = require('express').Router(); 
const Pasajero = require('../models/pasajero'); 

pasajerosRouter.post('/', async (request, response) => {
  const { cedula, nombre, apellido, fechaNacimiento, genero, correo, telefono } = request.body;

  try {
      // Verificar si la cedula ya está registrada
      const existingPasajero = await Pasajero.findOne({ cedula });

      if (existingPasajero) {
          // Si la cedula ya está registrada, devolver un error
          return response.status(400).json({ error: 'La cedula ya está registrada para un pasajero' });
      }

      // Si la cedula no está registrada, crear un nuevo pasajero
      const nuevoPasajero = new Pasajero({
          cedula,
          nombre,
          apellido,
          fechaNacimiento,
          genero,
          correo,
          telefono,
      });

      const pasajeroGuardado = await nuevoPasajero.save();

      response.status(201).json(pasajeroGuardado);
  } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al guardar el pasajero en la base de datos' });
  }
});


module.exports = pasajerosRouter;
