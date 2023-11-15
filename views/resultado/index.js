var seleccionarBtn = document.getElementById("#seleccionarBtn");

        // Agregar un evento de clic al botón
        seleccionarBtn.addEventListener("click", () => {
            // Redirigir a la página de selección de asientos
            window.location.href = "/seat";
            console.log(seleccionarBtn,'hola')
        });
