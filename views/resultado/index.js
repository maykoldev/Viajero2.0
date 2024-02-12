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
            const response = await fetch(`/api/proveedores?ruta.origen=${encodeURIComponent(origen)}&ruta.destino=${encodeURIComponent(destino)}&ruta.fecha=${encodeURIComponent(fecha)}`);
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
    
    

    async function obtenerDetalleRuta(nombreRuta, atributo) {
    if (detallesRutasCache[nombreRuta]) {
        // Si ya tenemos los detalles en caché, devolverlos directamente
        return detallesRutasCache[nombreRuta][atributo];
    } else {
        // Si no están en caché, hacer la solicitud al servidor
        console.log(`Solicitando detalles para la ruta: ${nombreRuta}`);
        try {
            const response = await fetch(`/api/ruta-detalle?nombre=${encodeURIComponent(nombreRuta)}`);
            if (response.ok) {
                const ruta = await response.json();
                // Almacenar los detalles en caché para futuras referencias
                detallesRutasCache[nombreRuta] = ruta;
                return ruta[atributo];
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

        // Mostrar los nuevos resultados
        for (const proveedor of resultados) {
            const tr = document.createElement('tr'); 
            tr.classList.add('py-4')           
            tr.innerHTML = `
                <td class="w-[95px] flex justify-center my-2" ><img src="${proveedor.logo || '/uploads/logos'}" alt="Logo del proveedor" style="width: 80px;"></td>
                <td>${proveedor.razonSocial || 'N/A'}</td>
                <td>${await obtenerDetalleRuta(proveedor.ruta, 'origen') || 'N/A'}</td>
                <td>${await obtenerDetalleRuta(proveedor.ruta, 'destino') || 'N/A'}</td>
                <td>${proveedor.fecha || 'N/A'}</td>
                <td>${await obtenerDetalleRuta(proveedor.ruta, 'precio') || 'N/A'}</td>
                <td><button class="btnSeleccionar text-white p-2 hover:text-blue-900 hover:bg-blue-300 cursor-pointer bg-blue-700 rounded uppercase" data-proveedor-id="${proveedor.proveedorId}">Seleccionar</button></td>
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




