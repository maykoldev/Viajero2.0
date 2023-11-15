// Obtén los elementos del DOM
const origenSelect = document.getElementById('origen');
const destinoSelect = document.getElementById('destino');
const fechaInput = document.getElementById('fecha');
const buscarBtn = document.getElementById('buscar-ruta');

// Cargar opciones en los select input desde un JSON
/*fetch('opciones.json')
  .then(response => response.json())
  .then(data => {
    // Agregar opciones al select de origen
    data.origenes.forEach(opcion => {
      const option = document.createElement('option');
      option.value = opcion;
      option.textContent = opcion;
      origenSelect.appendChild(option);
    });

    // Agregar opciones al select de destino
    data.destinos.forEach(opcion => {
      const option = document.createElement('option');
      option.value = opcion;
      option.textContent = opcion;
      destinoSelect.appendChild(option);
    });
  })
  .catch(error => console.error(error));*/

// Agregar evento de clic al botón de búsqueda
buscarBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // Obtener los valores seleccionados de los select input y la fecha
  const origen = origenSelect.value;
  const destino = destinoSelect.value;
  const fecha = fechaInput.value;

  if (buscarBtn===''){
    console.log('debe seleccionar ')
  }
  // Realizar la lógica de búsqueda o redireccionar a la página de resultados
  // ...

  // redirección a la página de resultados
  window.location.href = `/res?origen=${origen}&destino=${destino}&fecha=${fecha}`;
});

 
