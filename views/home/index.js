// Obtén los elementos del DOM
const origenSelect = document.getElementById('origen');
const destinoSelect = document.getElementById('destino');
const fechaInput = document.getElementById('fecha');
const buscarBtn = document.getElementById('buscar-ruta');
const btnPc = document.getElementById('buscar-ruta-pc');

buscarBtn.addEventListener('click', function(event) {
  event.preventDefault();
  // Obtener los valores seleccionados de los select input y la fecha
  const origen = origenSelect.value;
  const destino = destinoSelect.value;
  const fecha = fechaInput.value;

  // Validar que los campos estén llenos
  if (origen.length ||estino.length || fecha.length === 0) {
    alert('todos los campos deben estar llenos');
    return false;
  }

  

  // Realizar la lógica de búsqueda o redireccionar a la página de resultados
  // ...

  // redirección a la página de resultados
  window.location.href = `/res?origen=${origen}&destino=${destino}&fecha=${fecha}`;
});
