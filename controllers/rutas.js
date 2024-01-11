const rutasRouter = require('express').Router();
const User = require('../models/user');
const Ruta = require('../models/ruta');

// Endpoint para crear una nueva ruta (accesible solo por el administrador)
rutasRouter.post('/', async (req, res) => {
    const { nombre, origen, destino } = req.body; 

    try {
        // Verificar si el usuario que realiza la solicitud es un administrador
        const userId = req.userId;
        const user = await User.findById(userId);

        /*if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Acceso no autorizado. Solo los administradores pueden crear rutas.' });
        }*/
        

        // Si el usuario es un administrador, puedes crear la nueva ruta
        const nuevaRuta = new Ruta({ 
          nombre, 
          origen, 
          destino, 
          createdBy: userId 
        });

        // Guardar la nueva ruta en la base de datos
        const rutaGuardada = await nuevaRuta.save();
        
        res.status(201).json(rutaGuardada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la ruta.' });
    }
});

// Endpoint para obtener todas las rutas
rutasRouter.get('/', async (req, res) => {
    try {
        // Consultar todas las rutas en la base de datos
        const rutas = await Ruta.find();

        res.status(200).json(rutas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las rutas.' });
    }
});

module.exports = rutasRouter; 
