// Obtén los elementos del DOM
const origenSelect = document.getElementById('origenM');
const destinoSelect = document.getElementById('destinoM');
const fechaInput = document.getElementById('fechaM');
const buscarBtn = document.getElementById('buscar-ruta');
const origenPc = document.getElementById('origen');
const destinoPc = document.getElementById('destino');
const fechaPc = document.getElementById('fecha');

document.addEventListener("DOMContentLoaded", function () {
  cargarRutas();

  // Función para cargar las rutas existentes
  async function cargarRutas() {
    try {
      const response = await fetch("/api/rutas");
      if (response.ok) {
        const rutas = await response.json();
        console.log('Rutas existentes:', rutas);

        // Llenar las opciones de origen y destino
        llenarOpciones(rutas);
      } else {
        console.error('Error al obtener las rutas existentes.');
      }
    } catch (error) {
      console.error('Error de red al obtener las rutas existentes:', error);
    }
  }

  // Función para llenar las opciones de origen y destino
  function llenarOpciones(rutas) {
    /* Limpiar opciones anteriores si las hay
    origenSelect.innerHTML = '';
    destinoSelect.innerHTML = '';*/

    // Crear opciones basadas en las rutas existentes
    rutas.forEach(ruta => {
      // Crear opción para origenMovil
      const opcionOrigen = document.createElement('option');
      opcionOrigen.value = ruta.origen;
      opcionOrigen.textContent = ruta.origen;
      origenSelect.appendChild(opcionOrigen);
      

      // Crear opción para destinoMovil
      const opcionDestino = document.createElement('option');
      opcionDestino.value = ruta.destino;
      opcionDestino.textContent = ruta.destino;
      destinoSelect.appendChild(opcionDestino);

      // Crear opción para origenPc
      const optionOrigen = document.createElement('option');
      optionOrigen.value = ruta.origen;
      optionOrigen.textContent = ruta.origen;
      origenPc.appendChild(optionOrigen);

      // Crear opción para destinopc
      const optionDestino = document.createElement('option');
      optionDestino.value = ruta.destino;
      optionDestino.textContent = ruta.destino;
      destinoPc.appendChild(optionDestino);
    });
  }

  buscarBtn.addEventListener('click', function (event) {
    event.preventDefault();
    // Obtener los valores seleccionados de los select input y la fecha
    const origen = origenSelect.value;
    const destino = destinoSelect.value;
    const fecha = fechaInput.value;
    const origin = origenPc.value;
    const destination = destinoPc.value;

    // Validar que los campos estén llenos
    if (!origen || !destino || !fecha ||!origin || !destination) {
      alert('Todos los campos deben estar llenos');
      return false;
    }

    // redirección a la página de resultados
    window.location.href = `/res?origen=${origen}&destino=${destino}&fecha=${fecha}`;
  });
});
