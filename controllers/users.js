const usersRouter = require('express').Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid'); // Importa la función uuidv4 desde el paquete uuid

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    const savedUser = await newUser.save();

    // Configurar el transporte de nodemailer
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maykoldiaz009@gmail.com',
        pass: '',//////////ACA LAS CREDENCIALES
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
        ${process.env.APP_URL}/confirmar/${verificationCode}`,
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

usersRouter.get('/confirmar/:confirmationCode', async (request, response) => {
  const confirmationCode = request.params.confirmationCode;

  try {
    const user = await User.findOne({ verificationCode: confirmationCode });

    if (!user) {
      response.status(404).json({ error: 'Código de confirmación no válido' });
      return;
    }

    // Marcar al usuario como verificado en tu base de datos
    user.verified = true;
    await user.save();

    // Redirigir al usuario a la vista de login
    response.redirect('/confirmar');
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al procesar la confirmación' });
  }
});

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // El usuario no existe
      response.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    if (user.password !== password) {
      // La contraseña es incorrecta
      response.status(401).json({ error: 'La contraseña es incorrecta' });
      return;
    }

    // El usuario ha iniciado sesión correctamente
    response.status(200).json(user);
  } catch (error) {
    // Ocurrió un error al buscar el usuario
    response.status(404).json({ error: 'Error al buscar el usuario en la base de datos' });
  }
});

module.exports = usersRouter;