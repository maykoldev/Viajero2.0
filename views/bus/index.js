const asientos = document.getElementsByClassName('asientos');
const asientosSeleccionados = document.getElementById('asientos-seleccionados');


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

//funcion de los botones
const botones = document.querySelectorAll('button');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    window.location.href = 'pagina-de-pago.html';
  });
});