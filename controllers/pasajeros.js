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
      console.log('Fecha de nacimiento:', nuevoPasajero.fechaNacimiento);

      const pasajeroGuardado = await nuevoPasajero.save();

      response.status(201).json(pasajeroGuardado);
  } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al guardar el pasajero en la base de datos' });
  }
});

pasajerosRouter.get('/:cedula', async (req, res) => {
    const cedula = req.params.cedula;

    try {
        // Buscar el pasajero por cédula
        const pasajero = await Pasajero.findOne({ cedula });
    
        // Devolver los datos del pasajero o un objeto vacío si no se encuentra
        res.status(200).json(pasajero || {
            nombre: pasajero.nombre || '',
            apellido: pasajero.apellido || '',
            fechaNacimiento: pasajero.fechaNacimiento,
            genero: pasajero.genero || '',
            correo: pasajero.correo || '',
            telefono: pasajero.telefono || ''
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos del pasajero de la base de datos' });
      }
});


module.exports = pasajerosRouter;
