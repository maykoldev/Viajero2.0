const usersRouter = require('express').Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

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
      password,
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

// Ruta de inicio de sesión (tanto para usuarios normales como para el administrador)
// Ruta de inicio de sesión (tanto para usuarios normales como para el administrador)
usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // El usuario no existe
      response.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    // Verificar si el usuario es administrador
    const isAdmin = user.email === 'admin@example.com'; // Cambiar a la lógica de administrador que prefieras

    // Verificar las credenciales (tanto para usuarios normales como para el administrador)
    if ((isAdmin && password === 'Admin123') || (!isAdmin && user.password === password)) {
      // Credenciales válidas
      response.status(200).json({ user, isAdmin });
    } else {
      // Credenciales incorrectas
      response.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    // Ocurrió un error al buscar el usuario
    response.status(404).json({ error: 'Error al buscar el usuario en la base de datos' });
  }
});


module.exports = usersRouter;
