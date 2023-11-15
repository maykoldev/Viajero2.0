const asientos = document.getElementsByClassName('bg-puestos');
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
     
      this.classList.add('bg-orange-500','uppercase');
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