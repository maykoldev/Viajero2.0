document.addEventListener("DOMContentLoaded", function () {

    const agregarRLink = document.getElementById('agregarR');
    const modalAgregarRutas = document.getElementById('modalAgregarRutas');
    const cerrarRButton = document.getElementById('cerrarR');
    const guardarRButton = document.getElementById('guardarR');
    const actualizarRButton = document.getElementById('actualizarR');
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
        // Verificar si el formulario es válido antes de cerrar
        if (formulario.checkValidity()) {
            // Oculta la ventana emergente cambiando la clase de 'flex' a 'hidden'
            modalAgregarRutas.classList.remove('flex');
            modalAgregarRutas.classList.add('hidden');

            // Llamar a cargarRutas() después de cerrar el modal
            cargarRutas();
        } else {
            // Si el formulario no es válido, mostrar un mensaje de error o realizar otra acción según tus necesidades
            alert('Por favor, complete todos los campos obligatorios.');
        }
    });

    // Agrega un evento de clic al botón "Guardar Rutas"
    guardarRButton.addEventListener('click', async function () {
        // Obtener el valor de la hora del input
        const horaInput = document.getElementById('hora').value;
        console.log('Valor de la hora seleccionada:', horaInput)
        // Validar el formato de la hora utilizando una expresión regular
        const horaValida = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horaInput);

        if (!horaValida) {
            alert('El formato de la hora seleccionada no es válido. Utiliza el formato HH:mm, por ejemplo, "17:30" para las 5:30 PM.');
            return;
        }
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const precio = document.getElementById('precio').value;
        
        const hora = document.getElementById('hora').value;

        if(!nombre||!origen||!destino||!precio||!hora){
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
                    hora,
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
        // Crear una nueva fila (tr) para la nueva ruta
        const nuevaFila = document.createElement('tr');

        // Crear celdas (td) para cada propiedad de la ruta
        const propiedades = ['nombre', 'origen', 'destino', 'precio', 'fecha', 'hora'];
        propiedades.forEach(propiedad => {
            const celda = document.createElement('td');
            celda.textContent = nuevaRuta[propiedad];
            celda.classList.add('text-center');
            nuevaFila.appendChild(celda);
        });

        // Crear celda de acciones
        const celdaAcciones = document.createElement('td');
        celdaAcciones.classList.add('text-center');
        
        // Botón de Editar
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.classList.add('editbutton','m-2','p-2', 'text-white', 'hover:text-blue-900', 'hover:bg-blue-300', 'cursor-pointer', 'bg-blue-700', 'rounded', 'uppercase');
        botonEditar.dataset.rutaId = nuevaRuta.id;
        botonEditar.addEventListener("click", async () => {
            await handleEditRuta(nuevaRuta.id);
        });

        // Botón de Eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('text-red-200','m-2','p-2', 'hover:text-red-900', 'hover:bg-red-300', 'cursor-pointer', 'bg-red-700', 'rounded', 'uppercase');
        botonEliminar.addEventListener("click", async () => {
            await eliminarProveedor(nuevaRuta.id);
        });

        // Agregar botones a la celda de acciones
        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);

        // Agregar celda de acciones a la fila
        nuevaFila.appendChild(celdaAcciones);

        // Agregar la nueva fila a la tabla existente
        listaRutas.appendChild(nuevaFila);
    }
    // Variable global para almacenar el ID de la ruta actual
let rutaIdActual = null;

// Función para manejar la edición de una ruta
async function handleEditRuta(rutaId) {
    try {
        // Obtener los detalles de la ruta para editar
        const response = await fetch(`/api/rutas/${rutaId}`);
        if (response.ok) {
            const ruta = await response.json();
            // Llenar el formulario de edición con los detalles de la ruta
            document.getElementById('nombre').value = ruta.nombre;
            document.getElementById('origen').value = ruta.origen;
            document.getElementById('destino').value = ruta.destino;
            document.getElementById('precio').value = ruta.precio;
            // Otras asignaciones de valores de formulario según sea necesario

            // Almacenar el ID de la ruta actual
            rutaIdActual = rutaId;

            // Mostrar el modal para editar la ruta
            modalAgregarRutas.classList.remove('hidden');
            modalAgregarRutas.classList.add('flex');

            // Ocultar el botón de guardar y mostrar el botón de actualizar
            document.getElementById('guardarR').style.display = 'none';
            document.getElementById('actualizarR').style.display = 'block';
        } else {
            console.error('Error al obtener los detalles de la ruta para editar');
        }
    } catch (error) {
        console.error('Error al manejar la edición de la ruta:', error);
    }
}

// Manejador de eventos para el botón "Actualizar"
actualizarRButton.addEventListener('click', async function () {
    if (rutaIdActual) {
        // Obtener los valores actualizados del formulario
        const nombre = document.getElementById('nombre').value;
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const precio = document.getElementById('precio').value;
        const hora = document.getElementById('hora').value; 

        // Realizar la actualización de la ruta utilizando el ID almacenado
        try {
            const response = await fetch(`/api/rutas/${rutaIdActual}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    origen,
                    destino,
                    precio,
                    hora,
                }),
            });

            if (response.ok) {
                // Actualización exitosa, realizar acciones adicionales si es necesario
                console.log('Ruta actualizada con éxito');
                cargarRutas(); // Opcional: volver a cargar las rutas después de la actualización
                modalAgregarRutas.classList.remove('flex');
                modalAgregarRutas.classList.add('hidden');
            } else {
                console.error('Error al actualizar la ruta');
            }
        } catch (error) {
            console.error('Error al actualizar la ruta:', error);
        }
    } else {
        console.error('ID de ruta no disponible');
    }
});



    // Función para manejar la eliminación de una ruta
    async function eliminarProveedor(rutaId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta ruta?')) {
            try {
                const response = await fetch(`/api/rutas/${rutaId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Ruta eliminada correctamente');
                    // Actualizar la lista de rutas después de eliminar
                    cargarRutas();
                } else {
                    console.error('Error al eliminar la ruta');
                    // Manejar el error de eliminación de la ruta según sea necesario
                }
            } catch (error) {
                console.error('Error al eliminar la ruta:', error);
                // Manejar el error de eliminación de la ruta según sea necesario
            }
        } else {
            console.log('Cancelado');
        }
    }

    cargarRutas();
});
