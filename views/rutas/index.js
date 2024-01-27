document.addEventListener("DOMContentLoaded", function () {

    const agregarRLink = document.getElementById('agregarR');
    const modalAgregarRutas = document.getElementById('modalAgregarRutas');
    const cerrarRButton = document.getElementById('cerrarR');
    const guardarRButton = document.getElementById('guardarR');
    const formulario = document.getElementById('formAgregarRutas')
    const listaRutas = document.getElementById('listadoR')

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
        const precio = document.getElementById('precio').value;

        if(!nombre||!origen||!destino||!precio){
            alert('Tonos los campos son Obligatorios')
            return;
        }
        // lógica de guardado en la base de datos
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
                    precio,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Datos guardados correctamente en la base de datos:', data);

                formulario.reset();
               

                // Oculta la ventana emergente cambiando la clase de 'flex' a 'hidden'
                modalAgregarRutas.classList.remove('flex');
                modalAgregarRutas.classList.add('hidden');

                cargarRutas();
                
            } else {
                console.error('Error al intentar guardar datos en la base de datos.');
            }
        } catch (error) {
            console.error('Error al intentar guardar datos en la base de datos:', error);
            alert('Ocurrió un error al intentar guardar los datos. Por favor, inténtelo nuevamente.');
        }
    });

    // Función para cargar las rutas existentes
    async function cargarRutas() {

        listaRutas.innerHTML = '';
        try {
            const response = await fetch("/api/rutas");  // Endpoint para obtener todas las rutas
            if (response.ok) {
                const rutas = await response.json();
                console.log('Rutas existentes:', rutas);

                // Lógica para mostrar las rutas en la interfaz
                rutas.forEach(nuevaRuta => {
                    actualizarRutas(nuevaRuta);
                });
            } else {
                console.error('Error al obtener las rutas existentes.');
            }
        } catch (error) {
            console.error('Error de red al obtener las rutas existentes:', error);
        }
    }

    function actualizarRutas(nuevaRuta) {
        // Obtener el contenedor de la lista de rutas
        const listaRutas = document.getElementById('listadoR');
    
        // Crear una nueva fila (tr) para la nueva ruta
        const nuevaFila = document.createElement('tr');
    
        // Crear celdas (td) para cada propiedad de la ruta
        const celdaNombre = document.createElement('td');
        celdaNombre.classList.add('text-center');
        celdaNombre.textContent = nuevaRuta.nombre;
    
        const celdaOrigen = document.createElement('td');
        celdaOrigen.classList.add('text-center');
        celdaOrigen.textContent = nuevaRuta.origen;
    
        const celdaDestino = document.createElement('td');
        celdaDestino.classList.add('text-center');
        celdaDestino.textContent = nuevaRuta.destino;

        const celdaPrecio = document.createElement('td');
        celdaPrecio.classList.add('text-center');
        celdaPrecio.textContent = nuevaRuta.precio;
    
        // Agregar las celdas a la fila
        nuevaFila.appendChild(celdaNombre);
        nuevaFila.appendChild(celdaOrigen);
        nuevaFila.appendChild(celdaDestino);
        nuevaFila.appendChild(celdaPrecio);
    
        // Agregar la nueva fila a la tabla existente
        listaRutas.appendChild(nuevaFila);
    }
    cargarRutas();
});
