const proveedoresRouter = require('express').Router();
const Proveedor = require('../models/proveedor');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limitar el tamaño del archivo (en bytes) a 5 MB
    },
}).single('logo');

proveedoresRouter.post('/', async (request, response) => {
    try {
        upload(request, response, async (err) => {
            if (err) {
                console.error('Error al cargar el archivo:', err);
                return response.status(500).json({ error: 'Error al cargar el archivo' });
            }

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
                    logo: request.file ? request.file.buffer : null,
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
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
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
    const proveedor = await Proveedor.findById(id);

    if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    // Actualizar propiedades del proveedor
    proveedor.razonSocial = razonSocial;
    proveedor.rif = rif;
    proveedor.ruta = ruta;
    proveedor.fecha = fecha;
    proveedor.telefono = telefono;
    proveedor.correo = correo;
    proveedor.porcentajeGanancia = porcentajeGanancia;

    // Actualizar el logo solo si se proporciona un nuevo archivo
    if (req.file) {
        proveedor.logo = req.file.buffer;
    }

    const proveedorActualizado = await proveedor.save();

    res.json(proveedorActualizado);
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
module.exports = proveedoresRouter;

