const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {verificarAutenticacion} = require('../middleware/auth');


dotenv.config();

// Ruta de registro de usuario
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Si el correo electrónico ya está registrado, devolver un error
      return response.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Si el correo electrónico no está registrado, crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const savedUser = await newUser.save();

    // Configurar el transporte de nodemailer
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true,
  });


    // Generar un código único utilizando uuidv4
    const verificationCode = uuidv4();
    console.log('codigo', verificationCode);

    // Guardar el código de verificación en la base de datos
    savedUser.verificationCode = verificationCode;
    await savedUser.save();

    // Configurar el correo de verificación
    const emailOptions = {
      from: 'no-reply@example.com',
      to: savedUser.email,
      subject: 'Confirmación de registro',
      text: `
      Gracias por registrarte en nuestra aplicación.
      Para confirmar tu registro, haz clic en el siguiente enlace:
      ${process.env.APP_URL}/api/users/confirmar/${verificationCode}
`, // AQUÍ MODIFICADO
    };

    // Enviar el correo de verificación
    transport.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Correo de verificación enviado: ' + info.response);
      }
    });

    response.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al guardar el usuario en la base de datos' });
  }
});

// Ruta de confirmación de usuario
usersRouter.get('/confirmar/:confirmationCode', async (request, response) => {
  const confirmationCode = request.params.confirmationCode;

  try {
    // Buscar al usuario por el código de verificación
    const user = await User.findOne({ verificationCode: confirmationCode });

    if (!user) {
      response.status(404).json({ error: 'Código de confirmación no válido' });
      return;
    }

    // Marcar al usuario como verificado en tu base de datos
    user.verified = true;
    await user.save();

    // Redirigir al usuario a la vista de login
    response.redirect('/login');
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al procesar la confirmación' });
  }
});

// Ruta de inicio de sesión para usuarios normales
usersRouter.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: 'El usuario no existe' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Si el usuario es administrador, redirigir al panel de administrador
      if (user.isAdmin) {
        return response.status(200).json({ isAdmin: true, redirectTo: '/admon' });
      }

      // Almacena el ID del usuario en la sesión
      request.session.userId = user.id;
      return response.status(200).json({ redirectTo: '/' });
    } else {
      return response.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return response.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
});


// Ruta de cierre de sesión
usersRouter.post('/logout', verificarAutenticacion, async (req, res) => {
  try {
    
    req.session.destroy();

    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
});

module.exports = usersRouter;

