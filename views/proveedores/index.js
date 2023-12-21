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

document.onclick = check;

function check(e) {
  const target = e && e.target;

  // User Menu
  if (!checkParent(target, userMenuDiv) && checkParent(target, userMenu)) {
    toggleVisibility(userMenuDiv);
  } else {
    userMenuDiv.classList.add("invisible");
  }

  // Nav Menu
  if (!checkParent(target, navMenuDiv) && checkParent(target, navMenu)) {
    toggleVisibility(navMenuDiv);
  } else {
    navMenuDiv.classList.add("hidden");
  }
}

function toggleVisibility(element) {
  if (element.classList.contains("invisible")) {
    element.classList.remove("invisible");
  } else {
    element.classList.add("invisible");
  }
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

agregarProveedor.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleVisibility(modalAgregarProveedor);
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
        razonSocial: razonSocialValue,
        rif: rifValue,
        telefono: telefonoValue,
        correo: correoValue,
        porcentajeGanancia: gananciaValue,
      }),
    });

    if (response.ok) {
      modalAgregarProveedor.classList.add("hidden");
    } else {
      showAlert("Error al agregar el proveedor.");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("Error al procesar la solicitud.");
  }
});

function showAlert(message) {
  alert(message);
}
