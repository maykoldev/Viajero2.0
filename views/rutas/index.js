document.addEventListener("DOMContentLoaded", function () {
    // ... (Código existente para menús y proveedores)

    // Obtén el enlace "Agregar Rutas" por su ID
    const agregarRLink = document.getElementById('agregarR');

    // Obtén la ventana emergente por su ID
    const modalAgregarRutas = document.getElementById('modalAgregarRutas');

    // Obtén el botón "Cerrar" por su ID
    const cerrarRButton = document.getElementById('cerrarR');

    // Obtén el botón "Guardar Rutas" por su ID
    const guardarRButton = document.getElementById('guardarR');

    // Agrega un evento de clic al enlace "Agregar Rutas"
    agregarRLink.addEventListener('click', function () {
        // Muestra la ventana emergente cambiando la clase de 'hidden' a 'flex'
        modalAgregarRutas.classList.remove('hidden');
        modalAgregarRutas.classList.add('flex');
    });

    // Agrega un evento de clic al botón "Cerrar" en la ventana emergente
    cerrarRButton.addEventListener('click', function () {
        // Oculta la ventana emergente cambiando la clase de 'flex' a 'hidden'
        modalAgregarRutas.classList.remove('flex');
        modalAgregarRutas.classList.add('hidden');
    });

    // Agrega un evento de clic al botón "Guardar Rutas"
    guardarRButton.addEventListener('click', async function () {
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;

        // Realizar la lógica de guardado en la base de datos
        try {
            const response = await fetch("/api/rutas", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    origen,
                    destino,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Datos guardados correctamente en la base de datos:', data);
                // Puedes realizar otras acciones aquí si es necesario
            } else {
                console.error('Error al intentar guardar datos en la base de datos.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });

});
