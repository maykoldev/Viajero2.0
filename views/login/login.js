const usuarioLogueado = true;

crearNavHome(usuarioLogueado);

const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#correo-input');
const passwordInput = document.querySelector('#password-input');

formulario.addEventListener('submit', async e => {
  console.log('Evento del formulario activado');
  e.preventDefault();

  try {
      console.log('Formulario enviado')
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
          // Mostrar un mensaje al usuario indicando que ambos campos son obligatorios.
          console.log("Por favor, completa ambos campos.");
          return;
      }

      const userCredentials = {
          email: email,
          password: password
      };

      // Hacer la solicitud al servidor para autenticar al usuario
      const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
      });
      console.log('Solicitud al servidor enviada'); 

      const data = await response.json();

      console.log('Data recibida del servidor:', data); 

      if (response.ok) {
          if (data.isAdmin) {
            console.log('Redirigiendo al usuario a la página del administrador');
            window.location.href = '/admin';  
          } else {
            console.log('Redirigiendo al usuario a la página del dashboard');
            window.location.href = '/';  
          }
        } else {
          // Mostrar un mensaje de error si las credenciales son incorrectas
          console.log('Error al autenticar:', data.error);
        }
  } catch (error) {
      // Manejar errores de manera adecuada, ya sea mostrando un mensaje al usuario o registrando el error en la consola.
      console.error("Ocurrió un error:", error);
  }
});


