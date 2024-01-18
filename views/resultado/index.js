document.addEventListener("DOMContentLoaded", async function () {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const origen = urlParams.get('origen');
    const destino = urlParams.get('destino');
    const fecha = urlParams.get('fecha');
  
    if (origen && destino && fecha) {
      // Realizar la consulta a la base de datos utilizando los parámetros de búsqueda
      try {
        const response = await fetch(`/api/resultados?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&fecha=${encodeURIComponent(fecha)}`);
  
        if (response.ok) {
          const resultados = await response.json();
  
          // Manipular los resultados y mostrarlos en la página
          mostrarResultados(resultados);
        } else {
          console.error('Error al obtener resultados:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red al obtener resultados:', error);
      }
    } else {
      console.error('Parámetros de búsqueda incompletos.');
    }
  });
  
