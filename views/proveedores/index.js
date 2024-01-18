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
  const ruta = document.getElementById("nombreR");
  const fecha = document.getElementById("fechaP");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const ganancia = document.getElementById("porcentaje");
  const guardar = document.getElementById("guardarP");
  const cerrarForm = document.getElementById("cerrarF");
  const listaProveedoresContainer = document.getElementById('listadoP');
  const logoEmpresaInput = document.getElementById("logoEmpresa");
  const logoPreview = document.getElementById("logoPreview");

  function checkParent(t, elm) {
    while (t.parentNode) {
      if (t == elm) {
        return true;
      }
      t = t.parentNode;
    }
    return false;
  }

  document.onclick = check;

  function check(e) {
    const target = e && e.target;

    if (!checkParent(target, userMenuDiv) && checkParent(target, userMenu)) {
      toggleVisibility(userMenuDiv);
    } else {
      userMenuDiv.classList.add("hidden");
    }

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

  agregarProveedor.addEventListener("click", async (e) => {
    e.stopPropagation();
    await cargarNombresR();
    toggleVisibility(modalAgregarProveedor);
    modalAgregarProveedor.classList.add("flex");
  });

  cerrarForm.addEventListener("click", () => {
    modalAgregarProveedor.classList.add("hidden");
  });

  guardar.addEventListener("click", async () => {
    try {
      const razonSocialValue = razonS.value;
      const rifValue = rif.value;
      const rutaValue = ruta.value;
      const fechaValue = fecha.value;
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
        !rutaValue ||
        !fechaValue ||
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
  
      const formData = new FormData();
      formData.append("razonSocial", razonSocialValue);
      formData.append("rif", rifValue);
      formData.append("ruta", rutaValue);
      formData.append("fecha", fechaValue);
      formData.append("telefono", telefonoValue);
      formData.append("correo", correoValue);
      formData.append("porcentajeGanancia", gananciaValue);
  
      // Verificar si logoEmpresaInput no es null y si tiene la propiedad 'files'
      if (logoEmpresaInput && logoEmpresaInput.files && logoEmpresaInput.files.length > 0) {
        formData.append("logoEmpresa", logoEmpresaInput.files[0]);
    } else {
        console.error("El input del logo de la empresa está vacío o no es válido.");
        showAlert("Error al obtener el logo de la empresa. Asegúrate de seleccionar un archivo.");
        return;
    }
    
  
      const response = await fetch("/api/proveedores", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Datos guardados correctamente:', data);
  
        formulario.reset();
  
        modalAgregarProveedor.classList.remove('flex');
        modalAgregarProveedor.classList.add("hidden");
  
        cargarListaProveedores();

        if (data.is){
          await cargarDetallesProveedores(data.id);
        }
      } else {
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

  async function cargarListaProveedores() {
    listaProveedoresContainer.innerHTML = '';

    try {
      const response = await fetch("/api/proveedores");
      if (response.ok) {
        const proveedores = await response.json();

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
    const nuevaFila = document.createElement('tr');
    nuevaFila.id = `proveedor-${nuevoProveedor.id}`;

    const celdaLogo = document.createElement('td');
    const logoEmpresa = document.createElement('img')
    // Asignar la URL de la imagen del logo del proveedor (ajusta según la estructura de tus datos)
    logoEmpresa.src = nuevoProveedor.logoEmpresa;
    logoEmpresa.alt = 'Logo de la empresa';
    logoEmpresa.style.width = '100px';

    const celdaRazonSocial = document.createElement('td');
    celdaRazonSocial.classList.add('m-auto')
    celdaRazonSocial.textContent = nuevoProveedor.razonSocial;

    const celdaRif = document.createElement('td');
    celdaRif.textContent = nuevoProveedor.rif;

    const celdaRuta = document.createElement('td');
    celdaRuta.textContent = nuevoProveedor.ruta;

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = nuevoProveedor.fecha;

    const celdaTelefono = document.createElement('td');
    celdaTelefono.textContent = nuevoProveedor.telefono;

    const celdaCorreo = document.createElement('td');
    celdaCorreo.textContent = nuevoProveedor.correo;

    const celdaGanancia = document.createElement('td');
    celdaGanancia.textContent = nuevoProveedor.porcentajeGanancia;

    const celdaAcciones = document.createElement('td');
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add('text-blue-600', 'hover:text-blue-900', 'cursor-pointer');
    botonEditar.onclick = () => editarProveedor(nuevoProveedor.id);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('text-red-600', 'hover:text-red-900', 'cursor-pointer');
    botonEliminar.onclick = () => eliminarProveedor(nuevoProveedor.id);

    celdaLogo.appendChild(logoEmpresa)
    celdaAcciones.appendChild(botonEditar);
    celdaAcciones.appendChild(botonEliminar);

    nuevaFila.appendChild(celdaLogo);
    nuevaFila.appendChild(celdaRazonSocial);
    nuevaFila.appendChild(celdaRif);
    nuevaFila.appendChild(celdaRuta);
    nuevaFila.appendChild(celdaFecha);
    nuevaFila.appendChild(celdaTelefono);
    nuevaFila.appendChild(celdaCorreo);
    nuevaFila.appendChild(celdaGanancia);
    nuevaFila.appendChild(celdaAcciones);

    listaProveedoresContainer.appendChild(nuevaFila);
  }

  async function editarProveedor(id) {
    console.log("Editar Proveedor llamado con ID", id);
    try {
      // Obtener los valores actualizados del formulario
      const razonSocialValue = razonS.value;
      const rifValue = rif.value;
      const rutaValue = ruta.value;
      const fechaValue = fecha.value;
      const telefonoValue = telefono.value;
      const correoValue = correo.value;
      const gananciaValue = ganancia.value;

      // Realizar la solicitud al servidor para actualizar el proveedor
      const formData = new FormData();
      formData.append("razonSocial", razonSocialValue);
      formData.append("rif", rifValue);
      formData.append("ruta", rutaValue);
      formData.append("fecha", fechaValue);
      formData.append("telefono", telefonoValue);
      formData.append("correo", correoValue);
      formData.append("porcentajeGanancia", gananciaValue);
      formData.append("logoEmpresa", logoEmpresaInput.files[0]);

      const response = await fetch(`/api/proveedores/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Proveedor actualizado correctamente:', data);

        // Resetear el formulario
        formulario.reset();

        // Ocultar el modal de agregar proveedor (editar)
        modalAgregarProveedor.classList.remove('flex');
        modalAgregarProveedor.classList.add("hidden");

        // Recargar la lista de proveedores
        cargarListaProveedores();

        // Cargar detalles del proveedor actualizado
        await cargarDetallesProveedor(data.id); 
      } else {
        const errorMessage = await response.text();
        showAlert(`Error al editar el proveedor: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      showAlert("Error al procesar la solicitud.");
    }
  }

  async function eliminarProveedor(id) {
    const confirmacion = confirm('¿Estás seguro de eliminar este proveedor?');
    if (confirmacion) {
      try {
        const response = await fetch(`/api/proveedores/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log('Proveedor eliminado correctamente.');

          const filaProveedor = document.getElementById(`proveedor-${id}`);
          if (filaProveedor) {
            filaProveedor.remove();
          }
        } else {
          const errorMessage = await response.text();
          showAlert(`Error al eliminar el proveedor: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error durante la solicitud:", error);
        showAlert("Error al procesar la solicitud de eliminación.");
      }
    }
  }

  async function cargarDetallesProveedor(id) {
    try {
      const response = await fetch(`/api/proveedores/${id}`);
      if (response.ok) {
        const proveedor = await response.json();
        return proveedor; // Devolver el proveedor cargado
      } else {
        console.error("Error al cargar detalles del proveedor.");
        throw new Error("Error al cargar detalles del proveedor");
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      throw error;
    }
  }

  async function cargarNombresR() {
    const selectElement = document.getElementById("nombreR");
    selectElement.innerHTML = '';

    selectElement.innerHTML += '<option value="">Seleccione</option>';

    try {
      const response = await fetch("/api/rutas");
      if (response.ok) {
        const nombresRutas = await response.json();

        nombresRutas.forEach(function (ruta) {
          selectElement.innerHTML += `<option value="${ruta.nombre}">${ruta.nombre}</option>`;
        });
      } else {
        console.error("Error al obtener nombres de rutas");
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  }
});
