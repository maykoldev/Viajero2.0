const express = require('express');
const proveedoresRouter = express.Router();
const Proveedor = require('../models/proveedor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/logos');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
}).single('logoEmpresa');

proveedoresRouter.post('/', async (request, response) => {
    try {
        upload(request, response, async (err) => {
            if (err) {
                console.error('Error al cargar el archivo:', err);
                return response.status(500).json({ error: 'Error al cargar el archivo' });
            }

            const { razonSocial, rif, ruta, fecha, telefono, correo, porcentajeGanancia } = request.body;

            try {
                const existingProveedor = await Proveedor.findOne({ rif });

                if (existingProveedor) {
                    return response.status(400).json({ error: 'El RIF ya está registrado para un proveedor' });
                }

                const nuevoProveedor = new Proveedor({
                    logo: request.file ? `/uploads/logos/${request.file.filename}` : null,
                    razonSocial,
                    rif,
                    ruta,
                    fecha,
                    telefono,
                    correo,
                    porcentajeGanancia,
                });

                if (request.file) {
                    nuevoProveedor.logo = `/uploads/logos/${request.file.filename}`;
                }

                const proveedorGuardado = await nuevoProveedor.save();

                response.status(201).json(proveedorGuardado);
            } catch (error) {
                console.error(error);
                response.status(500).json({ error: 'Error al guardar el proveedor en la base de datos' });
            }
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

proveedoresRouter.get('/', async (req, res) => {
    const { origen, destino, fecha } = req.query;

    try {
        let query = {};

        // Verificar si los parámetros se pasaron en la solicitud y agregarlos a la consulta
        if (origen) {
            query['ruta.origen'] = origen;
        }
        if (destino) {
            query['ruta.destino'] = destino;
        }
        if (fecha) {
            query.fecha = fecha;
        }

        // Filtrar los proveedores según la ruta de origen, destino y la fecha
        const proveedores = await Proveedor.find(query);

        res.status(200).json(proveedores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los proveedores en la base de datos' });
    }
});


proveedoresRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { razonSocial, rif, ruta, fecha, telefono, correo, porcentajeGanancia } = req.body;

    try {
        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        proveedor.razonSocial = razonSocial;
        proveedor.rif = rif;
        proveedor.ruta = ruta;
        proveedor.fecha = fecha;
        proveedor.telefono = telefono;
        proveedor.correo = correo;
        proveedor.porcentajeGanancia = porcentajeGanancia;

        if (req.file) {
            proveedor.logo = `/uploads/logos/${req.file.filename}`;
        }

        const proveedorActualizado = await proveedor.save();

        res.json(proveedorActualizado);
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

proveedoresRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Proveedor.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



module.exports = proveedoresRouter;
