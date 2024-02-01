const detalleRutaRouter = require('express').Router();
const Ruta = require('../models/ruta');

// Endpoint para obtener detalles de una ruta por nombre
detalleRutaRouter.get('/', async (req, res) => {
    try {
        const nombreRuta = req.query.nombre;

        if (!nombreRuta) {
            return res.status(400).json({ error: 'Se requiere el parámetro "nombre" en la consulta.' });
        }

        // Consultar la ruta en la base de datos por nombre
        const ruta = await Ruta.findOne({ nombre: nombreRuta });

        if (!ruta) {
            return res.status(404).json({ error: 'Ruta no encontrada.' });
        }

        res.status(200).json(ruta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalles de la ruta.' });
    }
});

module.exports = detalleRutaRouter;
