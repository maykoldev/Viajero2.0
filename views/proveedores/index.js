document.addEventListener("DOMContentLoaded", function () {
  const userMenuDiv = document.getElementById("userMenu");
  const userMenu = document.getElementById("userButton");
  const navMenuDiv = document.getElementById("nav-content");
  const navMenu = document.getElementById("nav-toggle");
  const agregarProveedor = document.getElementById("agregarP");
  const modalAgregarProveedor = document.getElementById("modalAgregarProveedor");
  const formulario = document.getElementById("formAgregarProveedor");
  const razonS = document.getElementById("razonSocial");
  const rif = document.getElementById("rif");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const ganancia = document.getElementById("porcentaje");
  const guardar = document.getElementById("guardarP");
  const cerrarForm = document.getElementById("cerrarF");
  const listaProveedoresContainer = document.getElementById('listadoP');

  document.onclick = check;

  function check(e) {
    const target = e && e.target;

    // User Menu
    if (!checkParent(target, userMenuDiv) && checkParent(target, userMenu)) {
      toggleVisibility(userMenuDiv);
    } else {
      userMenuDiv.classList.add("hidden");
    }

    // Nav Menu
    if (!checkParent(target, navMenuDiv) && checkParent(target, navMenu)) {
      toggleVisibility(navMenuDiv);
    } else {
      navMenuDiv.classList.add("hidden");
    }
  }

  function toggleVisibility(element) {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }

  agregarProveedor.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleVisibility(modalAgregarProveedor);
    modalAgregarProveedor.classList.add("flex");
  });

  cerrarForm.addEventListener("click", () => {
    modalAgregarProveedor.classList.add("hidden");
  });

  guardar.addEventListener("click", async () => {
    const razonSocialValue = razonS.value;
    const rifValue = rif.value;
    const telefonoValue = telefono.value;
    const correoValue = correo.value;
    const gananciaValue = ganancia.value;

    const rifRegex = /^[VEJPG]-\d{8}-\d$/;
    const telefonoRegex = /^[4][0-9]{9}$/;
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (
      !razonSocialValue ||
      !rifValue ||
      !telefonoValue ||
      !correoValue ||
      !gananciaValue
    ) {
      showAlert("Completa todos los campos antes de agregar al proveedor.");
      return;
    }

    if (!emailRegex.test(correoValue)) {
      showAlert("Formato de correo inválido.");
      return;
    }

    if (!rifRegex.test(rifValue)) {
      showAlert("Formato de RIF no válido. Debe tener el formato correcto.");
      return;
    }

    if (!telefonoRegex.test(telefonoValue)) {
      showAlert(
        "Formato de número de teléfono no válido. Debe ser un número venezolano."
      );
      return;
    }

    try {
      const response = await fetch("/api/proveedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razonSocial,
          rif,
          telefono,
          correo,
          porcentajeGanancia,
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('datos guardados corectamente: ', data);

        formulario.reset();

        //ocultar ventana
        modalAgregarProveedor.classList.remove('flex');
        modalAgregarProveedor.classList.add("hidden");

        cargarListaProveedores();
      } else {
        // Manejar errores específicos o genéricos aquí
        const errorMessage = await response.text();
        showAlert(`Error al agregar el proveedor: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      showAlert("Error al procesar la solicitud.");
    }
    
  });

  function showAlert(message) {
    alert(message);
  }
  
  cargarListaProveedores();

  // Función para cargar proveedores
async function cargarListaProveedores() {
   console.log('hola')
  listaProveedoresContainer.innerHTML = '';
 
  try { 
   console.log('hola 2')
    
    const response = await fetch("/api/proveedores");
    console.log(response);
    if (response.ok) {
      const proveedores = await response.json();
      console.log('proveedores existentes', proveedores);

      proveedores.forEach(nuevoProveedor => {
        actualizarProveedores(nuevoProveedor);
      });
    } else {
      
      console.error("Error al cargar la lista de proveedores.");
    }
  } catch (error) {
    console.error("Error al cargar la lista de proveedores:", error);
  }
}

function actualizarProveedores(nuevoProveedor) {
  // Obtener el contenedor de la lista de proveedores
  const listaProveedoresContainer = document.getElementById('listadoP');

  // Crear una nueva fila (tr) para el nuevo proveedor
  const nuevaFila = document.createElement('tr');

  // Crear celdas para cada propiedad
  const celdaRazonSocial = document.createElement('td');
  celdaRazonSocial.textContent = nuevoProveedor.razonSocial;

  const celdaRif = document.createElement('td');
  celdaRif.textContent = nuevoProveedor.rif;

  const celdaTelefono = document.createElement('td');
  celdaTelefono.textContent = nuevoProveedor.telefono;

  const celdaCorreo = document.createElement('td');
  celdaCorreo.textContent = nuevoProveedor.correo;

  const celdaGanancia = document.createElement('td');
  celdaGanancia.textContent = nuevoProveedor.porcentajeGanancia;

  // Agregar las celdas a la fila
  nuevaFila.appendChild(celdaRazonSocial);
  nuevaFila.appendChild(celdaRif);
  nuevaFila.appendChild(celdaTelefono);
  nuevaFila.appendChild(celdaCorreo);
  nuevaFila.appendChild(celdaGanancia);

  // Agregar nueva fila a la tabla existente
  listaProveedoresContainer.appendChild(nuevaFila);
}

function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}



});

