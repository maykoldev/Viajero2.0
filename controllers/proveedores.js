const proveedoresRouter = require('express').Router(); 
const Proveedor = require('../models/proveedor'); 

proveedoresRouter.post('/', async (request, response) => {
  const { razonSocial, rif, telefono, correo, porcentajeGanancia } = request.body;

  try {
    // Verificar si el RIF ya está registrado
    const existingProveedor = await Proveedor.findOne({ rif });

    if (existingProveedor) {
      // Si el RIF ya está registrado, devolver un error
      return response.status(400).json({ error: 'El RIF ya está registrado para un proveedor' });
    }

    // Si el RIF no está registrado, crear un nuevo proveedor
    const nuevoProveedor = new Proveedor({
      razonSocial,
      rif,
      telefono,
      correo,
      porcentajeGanancia,
    });

    const proveedorGuardado = await nuevoProveedor.save();

    response.status(201).json(proveedorGuardado);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al guardar el proveedor en la base de datos' });
  }
});


module.exports = proveedoresRouter;

