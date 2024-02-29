const detallesRutasCache = {};

document.addEventListener("DOMContentLoaded", async function () {
  const listadoR = document.getElementById('listadoR');

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
      const response = await fetch(`/api/proveedores?ruta.origen=<span class="math-inline">\{encodeURIComponent\(origen\)\}&ruta\.destino\=</span>{encodeURIComponent(destino)}&fecha=${encodeURIComponent(fecha)}`);
      console.log(response)
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


    async function obtenerDetalleRuta(nombreRuta) {
        if (detallesRutasCache[nombreRuta]) {
          // Si ya tenemos los detalles en caché, devolverlos directamente
          return detallesRutasCache[nombreRuta];
        } else {
          // Si no están en caché, hacer la solicitud al servidor
          console.log(`Solicitando detalles para la ruta: ${nombreRuta}`);
          try {
            const response = await fetch(`/api/ruta-detalle?nombre=${encodeURIComponent(nombreRuta)}`);
            console.log(response)
            if (response.ok) {
              const ruta = await response.json();
              // Almacenar los detalles en caché para futuras referencias
              detallesRutasCache[nombreRuta] = ruta;
              return ruta;
            } else {
              console.error(`Error al obtener detalle de ruta ${nombreRuta}.`);
              return null;
            }
          } catch (error) {
            console.error(`Error de red al obtener detalle de ruta ${nombreRuta}:`, error);
            return null;
          }
        }
      }
    
      async function mostrarResultados(resultados) {
        // Limpiar resultados anteriores
        listadoR.innerHTML = '';
    
        // Obtener los detalles de la ruta para todos los proveedores de manera paralela
        const detallesPromises = resultados.map(proveedor => obtenerDetalleRuta(proveedor.ruta));
        const detallesRuta = await Promise.all(detallesPromises);
    
        // Filtrar los resultados por origen, destino y fecha
        const resultadosFiltrados = resultados.filter((proveedor, index) => {
            const detalleOrigen = detallesRuta[index].origen;
            const detalleDestino = detallesRuta[index].destino;
            return (
                (detalleOrigen && detalleOrigen === origenParam) &&
                (detalleDestino && detalleDestino === destinoParam) &&
                proveedor.fecha === fechaParam
            );
        });
    
        // Mostrar los nuevos resultados
        for (const proveedor of resultadosFiltrados) {
          const tr = document.createElement('tr'); 
          tr.classList.add('py-4');
      
          // Obtener los detalles de la ruta
          const detalleOrigen = await obtenerDetalleRuta(proveedor.ruta, 'origen');
          const detalleDestino = await obtenerDetalleRuta(proveedor.ruta, 'destino');
          const detallePrecio = await obtenerDetalleRuta(proveedor.ruta, 'precio');
      
          // Mostrar los detalles en la tabla
          tr.innerHTML = `
            <td class="w-[95px] flex justify-center my-2 hidden md:flex">
              <img src="${proveedor.logo || '/uploads/logos'}" alt="Logo del proveedor" style="width: 80px;">
            </td>
            <td>${proveedor.razonSocial || 'N/A'}</td>
            <td>${detalleOrigen ? detalleOrigen.origen : origenParam}</td>
            <td>${detalleDestino ? detalleDestino.destino : 'N/A'}</td>
            <td>${proveedor.fecha || 'N/A'}</td>
            <td>${detallePrecio ? detallePrecio.precio : 'N/A'}</td>
            <td>
              <button class="btnSeleccionar text-white p-2 hover:text-blue-900 hover:bg-blue-300 cursor-pointer bg-blue-700 rounded uppercase " data-proveedor-id="${proveedor.proveedorId}">
                Seleccionar
              </button>
            </td>
          `;
          listadoR.appendChild(tr);
        }
      }
      
    

    listadoR.addEventListener('click', async function (event) {
        if (event.target.classList.contains('btnSeleccionar')) {
            const proveedorId = event.target.getAttribute('data-proveedor-id');
            await seleccionarEmpresa(proveedorId);
        }
    });

    async function seleccionarEmpresa(proveedorId) {
        console.log(`Empresa seleccionada: ${proveedorId}`);
        
        // Obtener detalles de la empresa seleccionada
        const detalleEmpresa = await obtenerDetalleEmpresa(proveedorId);
    
        // Almacenar detalles de la empresa en sessionStorage
        sessionStorage.setItem('empresaSeleccionada', JSON.stringify(detalleEmpresa));
    
        // Redirigir a la página de selección de asientos
        window.location.href = '/seat';
    }

    // Puedes agregar esta función en la misma sección de tu archivo index.js
async function obtenerDetalleEmpresa(proveedorId) {
    try {
        const response = await fetch(`/api/detalle-empresa?id=${encodeURIComponent(proveedorId)}`);
        if (response.ok) {
            const detalleEmpresa = await response.json();
            return detalleEmpresa;
        } else {
            console.error('Error al obtener detalle de la empresa.');
            return null;
        }
    } catch (error) {
        console.error('Error de red al obtener detalle de la empresa:', error);
        return null;
    }
}

    
});




