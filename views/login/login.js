const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#correo-input');
const passwordInput = document.querySelector('#password-input');

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    try {
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

        if (newUser.email === 'admin@correo.com' && newUser.password === 'Admin123') {
            localStorage.setItem('user', JSON.stringify(newUser));
            window.location.href = '/admon';
        } else {
            // Mostrar un mensaje indicando que las credenciales son incorrectas.
            console.log("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }

    } catch (error) {
        // Manejar errores de manera adecuada, ya sea mostrando un mensaje al usuario o registrando el error en la consola.
        console.error("Ocurrió un error:", error);
    }
});