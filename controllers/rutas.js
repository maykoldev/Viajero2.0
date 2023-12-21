const express = require('express');
const router = express.Router();
const Route = require('../models/route');
const User = require('../models/user');

// Endpoint para crear una nueva ruta (accesible solo por el administrador)
router.post('/routes', async (req, res) => {
  try {
    // Verificar si el usuario que realiza la solicitud es un administrador
    const userId = req.userId; // Supongamos que tienes un middleware que verifica y agrega el ID del usuario a la solicitud
    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Acceso no autorizado. Solo los administradores pueden crear rutas.' });
    }

    // Si el usuario es un administrador, puedes crear la nueva ruta
    const { origin, destination } = req.body;
    const newRoute = new Route({ origin, destination, createdBy: userId });

    // Guardar la nueva ruta en la base de datos
    const savedRoute = await newRoute.save();

    res.status(201).json(savedRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la ruta.' });
  }
});

// Otros endpoints para obtener, actualizar o eliminar rutas pueden ser agregados según tus necesidades

module.exports = router;
