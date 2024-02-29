const rutasRouter = require('express').Router();
const User = require('../models/user');
const Ruta = require('../models/ruta');
const moment = require('moment'); // Librería para manejar fechas

// Endpoint para crear una nueva ruta (accesible solo por el administrador)
rutasRouter.post('/', async (req, res) => {
    const { nombre, origen, destino, precio, fecha, hora } = req.body; 

    try {
        // Convertir la hora de formato de 12 horas a formato de 24 horas utilizando moment.js
        const horaEnFormato24 = moment(hora, 'h:mm A').format('HH:mm');

        // Si el usuario es un administrador, puedes crear la nueva ruta
        const nuevaRuta = new Ruta({ 
            nombre, 
            origen, 
            destino,
            precio,
            fecha,
            hora: horaEnFormato24, // Utiliza la hora convertida en formato de 24 horas
        });

        // Guardar la nueva ruta en la base de datos
        const rutaGuardada = await nuevaRuta.save();
        
        // Lógica para crear rutas para todos los días restantes del mes
        const fechaActual = moment();
        const ultimoDiaDelMes = moment().endOf('month');

        // Iterar sobre cada día entre la fecha actual y el último día del mes
        while (fechaActual.isSameOrBefore(ultimoDiaDelMes, 'day')) {
            // Crear una nueva instancia de ruta para este día
            const fechaSinHora = fechaActual.format('YYYY-MM-DD'); // Obtener fecha sin hora
            const nuevaRutaDiaria = new Ruta({
                nombre,
                origen,
                destino,
                precio,
                fecha: fechaSinHora, // Usar la fecha sin la hora y la zona horaria
                hora: horaEnFormato24,
            });

            // Guardar la nueva ruta diaria en la base de datos
            await nuevaRutaDiaria.save();

            // Avanzar al siguiente día
            fechaActual.add(1, 'day');
        }

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

// Endpoint para obtener los detalles de una ruta por su ID
rutasRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la ruta por su ID en la base de datos
        const ruta = await Ruta.findById(id);

        if (!ruta) {
            // Si no se encuentra la ruta, devolver un código de estado 404 (Not Found)
            return res.status(404).json({ error: 'Ruta no encontrada.' });
        }

        // Si se encuentra la ruta, devolver los detalles de la ruta como respuesta
        res.status(200).json(ruta);
    } catch (error) {
        // Manejar errores de servidor
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de la ruta.' });
    }
});


// Endpoint para editar una ruta existente por su ID
rutasRouter.put('/:id', async (req, res) => {
    const { nombre, origen, destino, precio, fecha, hora } = req.body;
    const { id } = req.params;

    try {
        // Buscar la ruta por su ID
        const rutaExistente = await Ruta.findById(id);

        if (!rutaExistente) {
            return res.status(404).json({ error: 'Ruta no encontrada.' });
        }

        // Actualizar solo los campos que se han proporcionado en la solicitud
        if (nombre) rutaExistente.nombre = nombre;
        if (origen) rutaExistente.origen = origen;
        if (destino) rutaExistente.destino = destino;
        if (precio) rutaExistente.precio = precio;
        if (fecha) rutaExistente.fecha = fecha;
        if (hora) rutaExistente.hora = moment(hora, 'h:mm A').format('HH:mm');

        // Guardar los cambios en la base de datos
        const rutaActualizada = await rutaExistente.save();

        res.status(200).json(rutaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la ruta.' });
    }
});


// Endpoint para eliminar una ruta existente por su ID
rutasRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la ruta por su ID y eliminarla
        const rutaEliminada = await Ruta.findByIdAndDelete(id);

        if (!rutaEliminada) {
            return res.status(404).json({ error: 'Ruta no encontrada.' });
        }

        res.status(200).json({ message: 'Ruta eliminada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la ruta.' });
    }
});

module.exports = rutasRouter;
