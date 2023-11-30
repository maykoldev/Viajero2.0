const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const newUser = new User({
    name,
    email,
    password
  });

  newUser.save()
    .then(savedUser => {
      // El usuario se ha guardado correctamente en la base de datos
      // Enviamos un correo de confirmación al usuario
      const emailOptions = {
        from: 'no-reply@example.com',
        to: savedUser.email,
        subject: 'Confirmación de registro',
        text: `
          Gracias por registrarte en nuestra aplicación.
          Para confirmar tu registro, haz clic en el siguiente enlace:
          ${process.env.APP_URL}/confirm/${savedUser._id}`
      };

      mail.sendEmail(emailOptions);

      response.status(201).json(savedUser);
    })
    .catch(error => {
      // Ocurrió un error al guardar el usuario
      response.status(500).json({ error: 'Error al guardar el usuario en la base de datos' });
    });
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
    response.status(500).json({ error: 'Error al buscar el usuario en la base de datos' });
  }
});

module.exports = usersRouter;