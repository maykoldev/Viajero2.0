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
  const logoEmpresaInput = document.getElementById("logoProveedor");
  

  agregarProveedor.addEventListener("click", async (e) => {
    e.stopPropagation();
    await cargarNombresR();
    showAgregarProveedorModal();
});

  function showAlert(message) {
      alert(message);
  }

  function showAgregarProveedorModal() {
    if (modalAgregarProveedor) {
        modalAgregarProveedor.classList.remove('hidden');
        modalAgregarProveedor.classList.add("flex");
    } else {
        console.error("Elemento modalAgregarProveedor no encontrado en el DOM.");
    }
}
  cargarListaProveedores();

  async function cargarDetallesProveedor(id) {
      try {
          const response = await fetch(`/api/proveedores/${id}`);
          if (response.ok) {
              const proveedor = await response.json();

              razonS.value = proveedor.razonSocial;
              rif.value = proveedor.rif;
              ruta.value = proveedor.ruta;
              fecha.value = proveedor.fecha;
              telefono.value = proveedor.telefono;
              correo.value = proveedor.correo;
              ganancia.value = proveedor.porcentajeGanancia;

              if (proveedor.logo) {
                  const blob = new Blob([proveedor.logo.buffer], { type: proveedor.logo.contentType });
                  const file = new File([blob], 'logo.png', { type: proveedor.logo.contentType });
                  const fileList = new DataTransfer();
                  fileList.items.add(file);
                  logoEmpresaInput.files = fileList.files;
              }

              modalAgregarProveedor.classList.remove('hidden');
              modalAgregarProveedor.classList.add("flex");
          } else {
              console.error("Error al cargar los detalles del proveedor:", response.status);
              showAlert("Error al cargar los detalles del proveedor.");
          }
      } catch (error) {
          console.error("Error al cargar detalles del proveedor:", error);
          showAlert("Error al cargar detalles del proveedor: " + error.message);
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
          formData.append("logoEmpresa", logoEmpresaInput.files[0]);

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

              // Aquí es donde se llama a cargarDetallesProveedor
              await cargarDetallesProveedor(data.id);
          } else {
              const errorMessage = await response.text();
              showAlert(`Error al agregar el proveedor: ${errorMessage}`);
          }
          toggleEditFormVisibility(false);
      } catch (error) {
          console.error("Error durante la solicitud:", error);
          showAlert("Error al procesar la solicitud.");
      }
  });

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
      nuevaFila.classList.add()

      const celdaLogo = document.createElement('td');
      const logoEmpresa = document.createElement('img')
      logoEmpresa.src = nuevoProveedor.logo;
      logoEmpresa.alt = 'Logo de la empresa';
      logoEmpresa.style.width = '100px';
      logoEmpresa.classList.add('m-auto', 'py-2')

      const celdaRazonSocial = document.createElement('td');
      celdaRazonSocial.classList.add('m-auto', 'text-center')
      celdaRazonSocial.textContent = nuevoProveedor.razonSocial;

      const celdaRif = document.createElement('td');
      celdaRif.classList.add('m-auto', 'text-center');
      celdaRif.textContent = nuevoProveedor.rif;

      const celdaRuta = document.createElement('td');
      celdaRuta.classList.add('m-auto', 'text-center');
      celdaRuta.textContent = nuevoProveedor.ruta;

      const celdaFecha = document.createElement('td');
      celdaFecha.classList.add('m-auto', 'text-center');
      celdaFecha.textContent = nuevoProveedor.fecha;

      const celdaTelefono = document.createElement('td');
      celdaTelefono.classList.add('m-auto', 'text-center');
      celdaTelefono.textContent = nuevoProveedor.telefono;

      const celdaCorreo = document.createElement('td');
      celdaCorreo.classList.add('m-auto', 'text-center');
      celdaCorreo.textContent = nuevoProveedor.correo;

      const celdaGanancia = document.createElement('td');
      celdaGanancia.classList.add('m-auto', 'text-center');
      celdaGanancia.textContent = nuevoProveedor.porcentajeGanancia;

      const celdaAcciones = document.createElement('td');
      celdaAcciones.classList.add('m-auto', 'text-center', 'flex', 'flex-col', 'gap-2', 'justify-center', 'my-4', 'py-4', 'px-2', 'md:w-1/2')

      const botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.classList.add('editbutton', 'text-white', 'hover:text-blue-900', 'hover:bg-blue-300', 'cursor-pointer', 'bg-blue-700', 'rounded', 'uppercase');
      botonEditar.dataset.proveedorId = nuevoProveedor.id;
      botonEditar.addEventListener("click", async () => {
         await handleEditProveedor(nuevoProveedor.id);
      });

      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.classList.add('text-red-200', 'hover:text-red-900', 'hover:bg-red-300', 'cursor-pointer', 'bg-red-700', 'rounded', 'uppercase');
      botonEliminar.addEventListener("click", async () => {
        await eliminarProveedor(nuevoProveedor.id);
    });


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
  
  function toggleEditFormVisibility(show) {
      const actualizarP = document.getElementById("actualizarP");
      const guardarP = document.getElementById("guardarP");

      if (actualizarP && guardarP) {
          if (show) {
              actualizarP.textContent = "Actualizar"
              actualizarP.classList.remove("hidden");
              guardarP.classList.add("hidden");
          } else {
              actualizarP.classList.add("hidden");
              guardarP.classList.remove("hidden");
          }
      } else {
          console.error("No se encontraron los elementos 'actualizarP' o 'guardarP'");
      }
  }


  function fillEditForm(proveedor) {
      // Llenar los campos del formulario con los datos del proveedor
      document.getElementById("razonSocial").value = proveedor.razonSocial;
      document.getElementById("rif").value = proveedor.rif;
      document.getElementById("nombreR").value = proveedor.ruta;
      document.getElementById("fechaP").value = proveedor.fecha;
      document.getElementById("telefono").value = proveedor.telefono;
      document.getElementById("correo").value = proveedor.correo;
      document.getElementById("porcentaje").value = proveedor.porcentajeGanancia;
      document.getElementById("proveedorId").value = proveedor.id; // Establecer el ID del proveedor en el campo oculto

      // Verificar si el elemento de vista previa del logo existe antes de acceder a él
      const logoPreview = document.getElementById("logoPreview");
      if (logoPreview) {
          // Verificar si el proveedor tiene un logo y cargarlo si es así
          if (proveedor.logo) {
              const logoUrl = proveedor.logo; // Obtener la URL del logo del proveedor
              logoPreview.src = logoUrl; // Asignar la URL del logo al elemento de vista previa
              // Mostrar el campo de entrada de archivos solo si hay un logo existente
              document.getElementById("logoFormGroup").classList.remove("hidden");
          } else {
              // Si el proveedor no tiene un logo, ocultar el campo de entrada de archivos y la vista previa del logo
              document.getElementById("logoFormGroup").classList.add("hidden");
              logoPreview.src = ""; // Limpiar la URL del logo en la vista previa
          }
      } else {
          console.error("Elemento de vista previa del logo no encontrado.");
      }

      // Ocultar el botón "Agregar" y mostrar el botón "Guardar" en el formulario de edición
      const actualizarP = document.getElementById("actualizarP");
      const guardarP = document.getElementById("guardarP");
      if (actualizarP && guardarP) {
          actualizarP.classList.remove("hidden");
          guardarP.classList.add("hidden");
      } else {
          console.error("No se encontraron los elementos 'actualizarP' o 'guardarP'");
      }
  }


  async function handleEditProveedor(id) {
    console.log("Editando proveedor con ID:", id);
    try {
        const response = await fetch(`/api/proveedores/${id}`);
        if (response.ok) {
            const proveedor = await response.json();
            console.log(proveedor)
            const modalAgregarProveedor = document.getElementById("modalAgregarProveedor");
          
              if (modalAgregarProveedor) {
                  modalAgregarProveedor.classList.remove('hidden');
              
                  modalAgregarProveedor.classList.add("flex");
                  
                  fillEditForm(proveedor);
                  
                  // Llamar a cargarNombresR() para cargar las rutas
                  await cargarNombresR();
              } else {
                  console.error("El elemento modalAgregarProveedor no se encontró en el DOM.");
              }
                console.error("El elemento modalAgregarProveedor no se encontró en el DOM.");
                            
        } else {
            console.error("Error al cargar los detalles del proveedor:", response.status);
        }
    } catch (error) {
        console.error("Error al cargar detalles del proveedor:", error.message);
    }
}



  document.getElementById("actualizarP").addEventListener("click", async () => {
      try {
          const formData = new FormData(formulario);
          const id = formData.get('id'); // Obtener el ID del proveedor del campo oculto en el formulario

          const response = await fetch(`/api/proveedores/${id}`, {
              method: "PUT",
              body: formData,
          });

          if (response.ok) {
              const data = await response.json();
              console.log('Proveedor actualizado correctamente:', data);

              formulario.reset(); // Limpiar el formulario después de la actualización

              modalAgregarProveedor.classList.remove('flex'); // Ocultar el formulario de edición
              modalAgregarProveedor.classList.add("hidden");

              cargarListaProveedores(); // Recargar la lista de proveedores
          } else {
              const errorMessage = await response.text();
              showAlert(`Error al editar el proveedor: ${errorMessage}`);
          }
          toggleEditFormVisibility(false); // Ocultar el formulario de edición
      } catch (error) {
          console.error("Error durante la solicitud:", error);
          showAlert("Error al procesar la solicitud.");
      }
  });

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
                } else {
                    console.error(`No se encontró el proveedor con el ID: ${id}`);
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
});

