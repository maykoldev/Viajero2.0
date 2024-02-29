document.addEventListener('DOMContentLoaded', function () {
  const asientos = document.getElementsByClassName('asientos');
  const asientosSeleccionados = document.getElementById('asientos-seleccionados');
  const ventana = document.getElementById('ventanaEmergente');
  const bus = document.getElementById('bus');
  const atras = document.getElementById('atras');
  const busContainer = document.querySelector('.bg-containerA');

  // Definir el número de filas y columnas de asientos
  const numRows = 12;
  const numCols = 4;

  // Crear un bucle para generar los asientos
  for (let row = 0; row < numRows; row++) {
    // Crear un div para representar cada fila de asientos
    const seatRow = document.createElement('div');
    seatRow.classList.add('flex', 'justify-center');

    // Crear un bucle para generar los asientos en la fila actual
    for (let col = 0; col < numCols; col++) {
      // Crear un div para representar cada asiento
      const seat = document.createElement('div');
      seat.classList.add('asientos', 'bg-cover', 'w-12', 'h-12', 'leading-9', 'text-black', 'bg-no-repeat', 'font-semibold', 'rounded-[5px]', 'my-1', 'mx-1', 'cursor-pointer', 'bg-green-700');

      // Crear un input para cada asiento
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.classList.add('w-12', 'h-12', 'hidden');

      // Establecer un ID único para cada asiento
      input.id = `${row + 1}${String.fromCharCode(97 + col)}`;

      // Verificar si el asiento es 2c, 2d, 3c o 3d y asignar la clase correspondiente
      if ((row === 1 && col === 2) || (row === 1 && col === 3) || (row === 2 && col === 2) || (row === 2 && col === 3)) {
        seat.classList.remove('bg-green-700','cursor-pointer','bg-puestos')
        seat.classList.add('bg-bano', 'bg-gray-700');
        seat.style.pointerEvents = 'none';
      } else {
        seat.classList.add('bg-puestos');
      }

      // Agregar el input al div del asiento
      seat.appendChild(input);

      // Agregar el div del asiento a la fila
      seatRow.appendChild(seat);
    }

    // Insertar la fila de asientos en el contenedor del autobús
    busContainer.appendChild(seatRow);
  }

var nuevoFormulario;
var contadorFormularios = 0;
var cedula, nombre, apellido, fechaNac, genero, correo, telefono, form;

const empresaSeleccionada =JSON.parse(sessionStorage.getItem('empresaSeleccionada'));

// Realizar acciones según sea necesario con la empresaSeleccionada
console.log('Detalles de la empresa seleccionada:', empresaSeleccionada);

// Restaurar sessionStorage después de usarlo si es necesario
sessionStorage.removeItem('empresaSeleccionada');

Array.from(asientos).forEach(asiento => {
  asiento.addEventListener('click', function() {
    if (this.classList.contains('bg-orange-500')) {
      this.classList.remove('bg-orange-500');
      const asientoLabel = document.getElementById(this.id + '-label');
      if (asientoLabel) {
        asientosSeleccionados.removeChild(asientoLabel);
      }
    } else {
      if (document.querySelectorAll('.bg-orange-500').length >= 5) {
        alert('Solo puedes seleccionar un máximo de 5 asientos.');
        return;
      }
      this.classList.add('bg-orange-500', 'text-blue-700');
      const asientoLabel = document.createElement('span');
      asientoLabel.textContent = this.id;
      asientoLabel.id = this.id + '-label';
      asientosSeleccionados.appendChild(asientoLabel);
    }

    // Actualizar el contenido del div asientosSeleccionados
    actualizarAsientosSeleccionados();
  });
});

// Función para actualizar el contenido del div asientosSeleccionados
function actualizarAsientosSeleccionados() {
  // Obtener todos los asientos seleccionados
  const asientosSeleccionadosArray = document.querySelectorAll('.asientos.bg-orange-500');

  // Limpiar el contenido anterior del div asientosSeleccionados
  asientosSeleccionados.innerHTML = '';

  // Agregar los IDs de los asientos seleccionados al div asientosSeleccionados
  asientosSeleccionadosArray.forEach(asiento => {
    const asientoLabel = document.createElement('span');
    asientoLabel.textContent = asiento.id;
    asientosSeleccionados.appendChild(asientoLabel);
  });
}


// para deseleccionar los asientos
asientosSeleccionados.onclick = function() {
  
  Array.from(asientos).forEach(asiento => {
    asiento.classList.remove('bg-orange-500');
  });
  
  asientosSeleccionados.innerHTML = '';
};
  
  document.getElementById('comprar').addEventListener('click', function () {
    const asientosSeleccionados = document.querySelectorAll('.asientos.bg-orange-500');

    if (asientosSeleccionados.length === 0) {
      alert('Selecciona al menos un asiento antes de comprar.');
      return;
    }

    ventana.classList.remove('hidden');
    
    bus.classList.add('hidden');

    const cantidadAsientos = asientosSeleccionados.length;
    crearForms(cantidadAsientos);
  });

  function crearForms(cantidad) {
    const contenedorFormularios = document.getElementById('ventanaEmergente');
    contenedorFormularios.innerHTML = '';

    let forms = [];

    for (var i = 0; i < cantidad; i++) {
      contadorFormularios++;
      nuevoFormulario = document.createElement('div');
      nuevoFormulario.classList.add('w-full', 'felx', 'flex-col', 'justify-center', 'items-center')
      nuevoFormulario.innerHTML = `
      <div class="bg-blue-100 md:w-1/2 flex rounded-lg py-4 flex-col bg-container mb-8 bg-contain bg-center bg-no-repeat ">
      <h2 class="text-center font-bold text-2xl py-2 text-blue-950">Datos del pasajero ${i + 1}</h2>
      
      <div class="border-2 border-blue-900"></div>
      
          <form id="formPasajero${contadorFormularios}" class="font-semibold gap-4 my-4 p-4 md:p-4 w-full bg-white bg-opacity-60 rounded-lg" onsubmit="consultaCedula(); return false;">
      
              <div class=" flex flex-col">
                  <label for="cedula" class="block mb-2">Cedula:</label>
                  <input type="text" id="cedula" name="cedula" required class=" bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2">
      
                  <label for="nombres" class="block mb-2">Nombres:</label>
                  <input type="text" id="nombres" name="nombres" required class="bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2">
      
                  <label for="apellidos" class="block mb-2">Apellidos:</label>
                  <input type="text" id="apellidos" name="apellidos" required class="bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2">
      
                  <label for="fechaNacimiento" class="block mb-2">Fecha de nacimiento:</label>
                  <input type="date" id="fechaNacimiento" name="fechaNacimiento" class="h-auto bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2" placeholder="YYYY-MM-DD">

      
                  <p class="block mb-2">Genero:</p>
                  <div class="block mb-2">
                      <input type="radio" name="genero" id="masculino">
                      <label for="masculino" class="inline-block ml-2">Masculino</label>
                  </div>
                  <div class="block mb-2">
                      <input type="radio" name="genero" id="femenino">
                      <label for="femenino" class="inline-block ml-2">Femenino</label>
                  </div>
      
                  <label for="correo" class="block mb-2">Correo:</label>
                  <input type="email" id="correo" name="correo" required class="bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2">
      
                  <label for="telefono" class="block mb-2">Teléfono:</label>
                  <input type="tel" id="telefono" name="telefono" required class="bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2">
              </div>
          </form>
      
          <span class="text-xs">Todos los campos son requeridos</span>
      
          <div class="flex flex-col justify-center items-center gap-3 md:flex-row mt-4">
      
              <button id="guardarPas${contadorFormularios}" type="button" class="text-white items-center text-center font-bold cursor-pointer bg-blue-700 hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full md:w-1/2">Siguiente</button>
              
          </div>
    

    ${i === cantidad - 1 ?'<button id="atras" type="button" class="text-white items-center text-center font-bold cursor-pointer bg-blue-700 hover:bg-blue-400 my-2 py-2 px-4 rounded-lg transition ease-in-out w-full md:w-1/2">Atras</button>' : ''}

      `;
      contenedorFormularios.appendChild(nuevoFormulario);

  // Asignar valores a las variables globales
  cedula = document.getElementById('cedula');
  nombre = document.getElementById('nombres');
  apellido = document.getElementById('apellidos');
  fechaNac = document.getElementById('fechaNacimiento');
  generoM = document.getElementById('masculino');
  generoF = document.getElementById('femenino');
  correo = document.getElementById('correo');
  telefono = document.getElementById('telefono');
  form = document.getElementById('formPasajero');

  const guardar = document.getElementById(`guardarPas${contadorFormularios}`)

  guardar.addEventListener("click", async () => {
    
      // Obtener valores de los campos del formulario
      const cedulaValue = cedula.value;
      const nombreValue = nombre.value;
      const apellidoValue = apellido.value;
      const fechaNacValue = fechaNac.value;
      const generoValue = generoM.checked ? 'Masculino' : 'Femenino';
      const correoValue = correo.value;
      const telefonoValue = telefono.value;
      const telefonoRegex = /^[4][0-9]{9}$/;
      const emailRegex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        
      if (
        !nombreValue ||
        !cedulaValue ||
        !apellidoValue ||
        !fechaNacValue ||
        !generoValue ||
        !correoValue ||
        !telefonoValue
      ) {
        showAlert("Completa todos los campos para continuar");
        return;
      }
  
      if (!emailRegex.test(correoValue)) {
        showAlert("Formato de correo inválido.");
        return;
      }
  
      if (!telefonoRegex.test(telefonoValue)) {
        showAlert(
          "Formato de número de teléfono no válido. Debe ser un número venezolano."
        );
        return;
      }
  
      // Crear un objeto con los datos del formulario
      const formData = {
        cedula: cedulaValue,
        nombre: nombreValue,
        apellido: apellidoValue,
        fechaNacimiento: fechaNacValue,
        genero: generoValue,
        correo: correoValue,
        telefono: telefonoValue,
      };
  
      const response = await fetch("/api/pasajeros", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('datos guardados correctamente', data);
        
      } else {
        const errorMessage = await response.text();
        console.error('Error al agregar pasajero:', errorMessage);
        showAlert(`Error al agregar pasajero: ${errorMessage}`);
      }
    
  });
  
  // Asignar eventos keyup a los campos
    cedula.addEventListener('keyup', llenarCampos);
    nombre.addEventListener('keyup', llenarCampos);
    apellido.addEventListener('keyup', llenarCampos);
    fechaNac.addEventListener('keyup', llenarCampos);
    generoM.addEventListener('change', llenarCampos);
    generoF.addEventListener('change', llenarCampos);
    correo.addEventListener('keyup', llenarCampos);
    telefono.addEventListener('keyup', llenarCampos);
  
    function llenarCampos() {
      // Obtener el valor de la cédula del formulario actual
      const cedulaValue = cedula.value;
    
      // Realizar una solicitud al servidor para obtener los datos del pasajero
      fetch(`/api/pasajeros/${cedulaValue}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener datos del pasajero');
        }
      })
      .then(data => {
        // Verificar si la respuesta contiene datos del pasajero
        if (Object.keys(data).length > 0) {
          // Llenar los campos del formulario con los datos obtenidos
          nombre.value = data.nombre || '';
          apellido.value = data.apellido || '';
          
          // Convertir la fecha de formato ISO a "dd/mm/yyyy"
          fechaNac.value = convertirFecha(data.fechaNacimiento);
    
          // Asignar el género según los datos obtenidos
          generoM.checked = data.genero === 'Masculino';
          generoF.checked = data.genero === 'Femenino';
          correo.value = data.correo || '';
          telefono.value = data.telefono || '';
          
        } else {
          // No se encontró el pasajero, habilitar los campos para crear un nuevo pasajero
          
          nombre.removeAttribute('disabled');
          apellido.removeAttribute('disabled');
          fechaNac.removeAttribute('disabled');
          generoM.removeAttribute('disabled');
          generoF.removeAttribute('disabled');
          correo.removeAttribute('disabled');
          telefono.removeAttribute('disabled');
        }
      })
      .catch(error => {
        console.log(error);
        // No se encontró el pasajero, habilitar los campos para crear un nuevo pasajero
        nombre.removeAttribute('disabled');
        apellido.removeAttribute('disabled');
        fechaNac.removeAttribute('disabled');
        generoM.removeAttribute('disabled');
        generoF.removeAttribute('disabled');
        correo.removeAttribute('disabled');
        telefono.removeAttribute('disabled');
      });
    }
    
    // Función para convertir la fecha de formato ISO a "dd/mm/yyyy"
    function convertirFecha(fechaISO) {
      const fecha = new Date(fechaISO);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    }
    }
  } 

  const ventanaMetodosPago = document.getElementById('ventanaMetodosPago');
    const cerrarVentanaPago = document.getElementById('cerrarVentanaPago');

    // Agregar listener a los botones "Siguiente" generados dinámicamente
    document.addEventListener('click', function (event) {
        if (event.target.id && event.target.id.startsWith('guardarPas')) {
            const botonSiguiente = event.target;
            const formIndex = botonSiguiente.id.replace('guardarPas', '');
            
            // Mostrar la ventana emergente de métodos de pago
            mostrarVentanaMetodosPago(formIndex);
        }
    });

    cerrarVentanaPago.addEventListener('click', function () {
        // Cerrar la ventana emergente de métodos de pago
        ventanaMetodosPago.classList.add('hidden');
    });

    function mostrarVentanaMetodosPago(formIndex) {
        // Lógica para mostrar la ventana de métodos de pago según el índice del formulario
        console.log('Mostrar ventana de métodos de pago para el formulario:', formIndex);

        // Puedes personalizar esta lógica según tus necesidades
        ventanaMetodosPago.classList.remove('hidden');
    }

    function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'pay',
        },
    
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"description":"BOLETO","amount":{"currency_code":"USD","value":13}}]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            // Crea un cuadro de diálogo personalizado
            var thankYouMessage = "Gracias por comprar con nosotros. Su boleto será enviado a su correo electrónico.";
            var dialog = document.createElement('div');
            dialog.innerHTML = `
              <p>${thankYouMessage}</p>
              <button onclick="redirectToGmail()">Ir al correo electrónico</button>
            `;
            // Agrega el cuadro de diálogo al cuerpo del documento
            document.body.appendChild(dialog);
            // Redirige a la página de agradecimiento
           
          });
        },
        onError: function(err) {
          console.log(err);
        }
      }).render('#paypal-button-container');
    }
    
    function redirectToGmail() {
      // Redirige al usuario a Gmail
      window.location.href = 'https://mail.google.com/';
    }
  
    initPayPalButton();

    
  function showAlert(message) {
    alert(message);
  }


});



