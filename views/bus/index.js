document.addEventListener('DOMContentLoaded', function () {
const asientos = document.getElementsByClassName('asientos');
const asientosSeleccionados = document.getElementById('asientos-seleccionados');
const ventana = document.getElementById('ventanaEmergente');
const bus = document.getElementById('bus');
const atras = document.getElementById('atras');

var nuevoFormulario;
var contadorFormularios = 0;
var cedula, nombre, apellido, fechaNac, genero, correo, telefono, form;

Array.from(asientos).forEach(asiento => {
  asiento.onclick = function() {
    
    if (this.classList.contains('bg-orange-500')) {
      
      this.classList.remove('bg-orange-500');
      asientosSeleccionados.innerHTML = asientosSeleccionados.innerHTML.replace(this.id + ' ', '');
    } else {
      
      if (document.getElementsByClassName('bg-orange-500').length > 5) {//limite de asientos a seleccionar
        alert('Solo puedes seleccionar un máximo de 5 asientos.');
        return;
      }
     
      this.classList.add('bg-orange-500','text-blue-700');
      asientosSeleccionados.innerHTML += this.id + ' ';
    }
  };
});

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
                  <input type="date" id="fechaNacimiento" name="fechaNacimiento" class="h-auto bg-blue-100 outline rounded-md focus:outline-green-700 outline-2 block w-full md:w-auto mb-2">
      
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
        fechaNac: fechaNacValue,
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
        form.reset();
      } else {
        const errorMessage = await response.text();
        console.error('Error al agregar pasajero:', errorMessage);
        showAlert(`Error al agregar pasajero: ${errorMessage}`);
      }
    
  });
  
    }
  } 

  function showAlert(message) {
    alert(message);
  }

});



