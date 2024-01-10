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

        const newUser = {
            email: email,
            password: password
        };

        // Hacer la solicitud al servidor para autenticar al usuario
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        console.log('Solicitud al servidor enviada'); 

        const data = await response.json();

        console.log('Data recibida del servidor:', data); 

        if (response.ok) {
            // Redirigir al usuario a la página correspondiente (/admon para el administrador)
            console.log('Redirigiendo al usuario a la página:', data.isAdmin ? '/admon' : '/dashboard'); 

            const redirectTo = data.redirectTo || (data.isAdmin ? '/admon' : '/');
            window.location.href = redirectTo;
            console.log('Redirigiendo al usuario');
        } else {
            // Mostrar un mensaje de error si las credenciales son incorrectas
            console.log('Error al autenticar:', data.error); 
        }
    } catch (error) {
        // Manejar errores de manera adecuada, ya sea mostrando un mensaje al usuario o registrando el error en la consola.
        console.error("Ocurrió un error:", error);
    }
});
