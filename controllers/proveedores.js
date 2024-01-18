const proveedoresRouter = require('express').Router(); 
const Proveedor = require('../models/proveedor'); 

proveedoresRouter.post('/', async (request, response) => {
  const { razonSocial, rif, ruta, fecha, telefono, correo, porcentajeGanancia } = request.body;

  try {
      // Verificar si el RIF ya está registrado
      const existingProveedor = await Proveedor.findOne({ rif });

      if (existingProveedor) {
          // Si el RIF ya está registrado, devolver un error
          return response.status(400).json({ error: 'El RIF ya está registrado para un proveedor' });
      }

      // Si el RIF no está registrado, crear un nuevo proveedor
      const nuevoProveedor = new Proveedor({
          logo,
          razonSocial,
          rif,
          ruta,       
          fecha,      
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


//endpoint para obtener los proveedores
proveedoresRouter.get('/', async (req, res) => {

  try{
    const proveedores = await Proveedor.find();

    res.status(200).json(proveedores);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los proveedores en la base de datos' });
  }
});

proveedoresRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { razonSocial, rif, ruta, fecha, telefono, correo, porcentajeGanancia } = req.body;

  try {
    // Asumiendo que Proveedor.findByIdAndUpdate es una función de Mongoose para actualizar
    const updatedProveedor = await Proveedor.findByIdAndUpdate(id, {
      logo,
      razonSocial,
      rif,
      ruta,
      fecha,
      telefono,
      correo,
      porcentajeGanancia,
    }, { new: true });

    if (!updatedProveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    // Envía la respuesta con el proveedor actualizado
    res.json(updatedProveedor);
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
module.exports = proveedoresRouter;

