document.addEventListener("DOMContentLoaded", async function () {
  let usuarioLogueado = false;

  crearNavLogin(usuarioLogueado);

  const formulario = document.querySelector('#formulario');
  const emailInput = document.querySelector('#correo-input');
  const passwordInput = document.querySelector('#password-input');

  formulario.addEventListener('submit', async e => {
    e.preventDefault();

    try {
      console.log('Formulario enviado');

      const email = (emailInput && emailInput.value) ? emailInput.value.trim() : '';
      const password = (passwordInput && passwordInput.value) ? passwordInput.value.trim() : '';

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

      if (!response.ok) {
        // Mostrar un mensaje de error si las credenciales son incorrectas
        const errorData = await response.json();
        console.log('Error al autenticar:', errorData.error);
        return;
      }

      const data = await response.json();
      console.log('Data recibida del servidor:', data);

      usuarioLogueado = true;

      if (data.isAdmin) {
        console.log('Redirigiendo al usuario a la página del administrador');
        window.location.href = '/admon';
      } else {
        console.log('Redirigiendo al usuario a la página del dashboard');
        window.location.href = '/';
      }

    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  });

});



