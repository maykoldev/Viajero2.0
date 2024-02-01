document.addEventListener("DOMContentLoaded", async function () {
    const origenInput = document.getElementById('origen');
    const destinoInput = document.getElementById('destino');
    const fechaInput = document.getElementById('fecha');
    const buscarBtn = document.getElementById('buscar-ruta');
    const userMenu = document.getElementById('userButton');
    const sugerenciasOrigen = document.getElementById('sugerenciasOrigen');
    const sugerenciasDestino = document.getElementById('sugerenciasDestino');
  
    // Obtener todas las rutas desde el servidor
    async function obtenerRutas() {
      try {
        const response = await fetch("/api/rutas");
        if (response.ok) {
          const rutas = await response.json();
          return rutas;
        } else {
          console.error('Error al obtener las rutas existentes.');
          return [];
        }
      } catch (error) {
        console.error('Error de red al obtener las rutas existentes:', error);
        return [];
      }
    }
  
    // Obtener todas las rutas al cargar el DOM
    const todasLasRutas = await obtenerRutas();
  
    // Obtener opciones de origen y destino
    const opcionesOrigen = [...new Set(todasLasRutas.map(ruta => ruta.origen))];
    const opcionesDestino = [...new Set(todasLasRutas.map(ruta => ruta.destino))];
  
    // Función para filtrar sugerencias y mostrarlas
    function mostrarSugerencias(event, opciones, sugerenciasElement, inputElement) {
      const inputValue = event.target.value.toLowerCase();
      const sugerencias = opciones.filter(opcion =>
        opcion.toLowerCase().includes(inputValue)
      );
  
      // Limpiar sugerencias anteriores
      sugerenciasElement.innerHTML = '';
  
      // Mostrar las nuevas sugerencias
      sugerencias.forEach(sugerencia => {
        const li = document.createElement('li');
        li.textContent = sugerencia;
        li.addEventListener('click', () => {
          inputElement.value = sugerencia;
          sugerenciasElement.innerHTML = '';
        });
        sugerenciasElement.appendChild(li);
      });
    }
  
    // Evento de entrada para campo de origen
    origenInput.addEventListener('input', function (event) {
      mostrarSugerencias(event, opcionesOrigen, sugerenciasOrigen, origenInput);
      origenInput.classList.add('uppercase', 'text-center', 'text-blue-800');
    });
  
    // Evento de entrada para campo de destino
    destinoInput.addEventListener('input', function (event) {
      mostrarSugerencias(event, opcionesDestino, sugerenciasDestino, destinoInput);
      destinoInput.classList.add('uppercase', 'text-center', 'text-blue-800');
    });
  
    // Función que se ejecutará cuando se haga clic en el botón de búsqueda
  async function buscarClickHandler(event) {
    event.preventDefault();

    const origen = origenInput.value;
    const destino = destinoInput.value;
    const fecha = fechaInput.value;

    if (!origen || !destino || !fecha) {
      alert('Todos los campos deben estar llenos');
      return false;
    }

    // Realizar una consulta a la base de datos para verificar la existencia de proveedores
    const proveedoresDisponibles = await verificarExistenciaProveedor(origen, destino, fecha);

    if (proveedoresDisponibles.length > 0) {
      // Redirigir al usuario a la vista de resultados
      const url = `/res?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&fecha=${encodeURIComponent(fecha)}`;
      window.location.href = url;
    } else {
      alert('No hay proveedores disponibles para la ruta y fecha seleccionadas.');
    }
  }

  // Agregar el evento click para el botón de búsqueda
  buscarBtn.addEventListener('click', buscarClickHandler);

  async function verificarExistenciaProveedor(origen, destino, fecha) {
    try {
      const response = await fetch(`/api/proveedores?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&fecha=${encodeURIComponent(fecha)}`);
      if (response.ok) {
        const proveedores = await response.json();
        return proveedores;
      } else {
        console.error('Error al verificar la existencia de proveedores.');
        return [];
      }
    } catch (error) {
      console.error('Error de red al verificar la existencia de proveedores:', error);
      return [];
    }
  }

  // Obtener los parámetros de la URL para obtener y mostrar los resultados
  const urlParams = new URLSearchParams(window.location.search);
  const origenParam = urlParams.get('origen');
  const destinoParam = urlParams.get('destino');
  const fechaParam = urlParams.get('fecha');

  if (origenParam && destinoParam && fechaParam) {
    // Realizar una consulta al servidor para obtener los resultados y mostrarlos en la página
    const resultados = await obtenerResultados(origenParam, destinoParam, fechaParam);
    mostrarResultados(resultados);
  }

  async function obtenerResultados(origen, destino, fecha) {
    try {
      const response = await fetch(`/api/proveedores?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&fecha=${encodeURIComponent(fecha)}`);
      if (response.ok) {
        const proveedores = await response.json();
        return proveedores;
      } else {
        console.error('Error al obtener resultados de proveedores.');
        return [];
      }
    } catch (error) {
      console.error('Error de red al obtener resultados de proveedores:', error);
      return [];
    }
  }

  function mostrarResultados(resultados) {
    const listadoR = document.getElementById('listadoR');

    // Limpiar resultados anteriores
    listadoR.innerHTML = '';

    // Mostrar los nuevos resultados
    resultados.forEach(proveedor => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${proveedor.razonSocial}</td>
        <td>${proveedor.ruta}</td>
        <td>${proveedor.fecha}</td>
        <!-- Agrega más columnas según la información que desees mostrar -->
      `;
      listadoR.appendChild(tr);
    });
  }
});