document.addEventListener("DOMContentLoaded", async function () {
  let usuarioLogueado = false;
  console.log("Usuario Logueado (inicial):", usuarioLogueado);
  crearNavHome(usuarioLogueado);
  const origenSelect = document.getElementById('origenM');
  const destinoSelect = document.getElementById('destinoM');
  const fechaInput = document.getElementById('fechaM');
  const buscarBtn = document.getElementById('buscar-ruta');
  const origenPc = document.getElementById('origen');
  const destinoPc = document.getElementById('destino');
  const fechaPc = document.getElementById('fecha');
  const buscarBtnPc = document.getElementById('buscar-ruta-pc');
  const userMenu = document.getElementById('userButton');
  
  /*const userMenuDiv = document.getElementById('userMenu');
  const enlaceSalir = document.getElementById('cerrarS');

  userMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    userMenuDiv.classList.toggle('invisible');
  });
  // Cierra el menú si se hace clic fuera de él
  document.addEventListener("click", function () {
    userMenuDiv.classList.add("invisible");
  });
  async function cerrarSesionEnServidor() {
    console.log('intentando cerrar sesion en servidor')
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {

        usuarioLogueado = false;
        return true;
      } else {
        console.error('Error al cerrar sesión en el servidor:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
      return false;
    }
  }

  // Agrega el evento de clic al enlace "Salir"
if (enlaceSalir) {
    enlaceSalir.addEventListener('click', async function (e) {
        e.preventDefault();

        try {
            const cerrarSesionExitosa = await cerrarSesionEnServidor();

            if (cerrarSesionExitosa) {
                window.location.href = '/';
            } else {
                alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en enlaceSalir.addEventListener:', error);
        }
    });
} else {
    console.error('Elemento con ID "cerrarS" no encontrado.');
}*/


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
    // Limpiar opciones anteriores si las hay
    origenSelect.innerHTML = '';
    destinoSelect.innerHTML = '';

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

  // Función que se ejecutará cuando se haga clic en los botones de búsqueda
function buscarClickHandler(event) {
  event.preventDefault();

  if(!usuarioLogueado){
    window.location.href = '/login'; 
    return;
  }

  const origen = origenSelect.value || origenPc.value;
  const destino = destinoSelect.value || destinoPc.value;
  const fecha = fechaInput.value || fechaPc.value;

  if (!origen || !destino || !fecha) {
      alert('Todos los campos deben estar llenos');
      return false;
  }
  const url = `/res?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&fecha=${encodeURIComponent(fecha)}`;

  window.location.href = url;
}

// Agregar el evento click para el botón de búsqueda en pantallas normales
buscarBtn.addEventListener('click', buscarClickHandler);

// Agregar el evento click para el botón de búsqueda en pantallas grandes
if (buscarBtnPc) {
  buscarBtnPc.addEventListener('click', buscarClickHandler);
}


  // Cargar rutas al cargar el DOM
  cargarRutas();
});
