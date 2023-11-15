const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#nombre-input');
const emailInput = document.querySelector('#correo-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#password-input2');
const btnRegistro = document.querySelector('#form-btn');
//console.log(axios)

//validamos
//validacion con REGEX de Nombre
const nameVal = /^[A-Z]{1}[a-zA-Z]+\s[A-Z]{1}[a-zA-Z]+$/;
//validar Email
const emailVal = /[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
//Validar password
const passVal = /^(?=.*\d)(?=.*[a-z])(?=.*[!#$%&'.,*+/=?^_`{|}~-])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm;

let valname = false;
let valemail = false;
let valpass = false;
let valmatch = false;



nameInput.addEventListener('input', e => {
    valname = nameVal.test(e.target.value);
    //console.log(valname);
    validar(nameInput, valname)
})

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(e.target.value)
    validar(emailInput, valemail)
})

passwordInput.addEventListener('input', e => {
    valpass = passVal.test(e.target.value);
    validar(passwordInput, valpass);
    validar(matchInput, valmatch)
})

matchInput.addEventListener('input', e => {
    valmatch = e.target.value === passwordInput.value;
    validar(matchInput, valmatch);
    validar(passwordInput, valpass)
    

})
const validar = (input, value) => {
    btnRegistro.disabled = valname && valemail && valpass && valmatch ? false : true;
    /*console.log(btnRegistro.disabled)
    console.log(valname, 'valname')
    console.log(valemail, 'valemail')
    console.log(valpass, 'valpass')
    console.log(valmatch,'valmatch')*/


    if (value) {
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.remove('focus:outline-red-900', 'outline-4')
        input.classList.add('focus:outline-blue-700', 'outline-4')
    } else if (input.value === ' ') {
        input.classList.remove('focus:outline-blue-700', 'outline-4');
        input.classList.remove('focus:outline-red-700', 'outline-4')
        input.classList.add('focus:outline-red-900', 'outline-4')
    } else {
        input.classList.remove('focus:outline-blue-700', 'outline-4');
        input.classList.remove('focus:outline-red-900', 'outline-4')
        input.classList.add('focus:outline-red-700', 'outline-4')
    }
    
}


formulario.addEventListener('submit', async e=>{
    e.preventDefault();
    
    try{
        const newUser ={
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
            
        }
        formulario.reset();

        const response = await axios.post('/api/users', newUser)//ALIAS(/api/users) //debo indicarle la ruta a nivel de backend
        console.log(response)
        createNotification(false,response.data.msg);

       // console.log(newUser)
    }catch(error){
        console.log(error)
        createNotification(true,error.response.data.error)
        
    }
    
})

document.getElementById("form-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    // Obtén los valores de los campos de entrada
    var nombre = document.getElementById("nombre-input").value;
    var correo = document.getElementById("correo-input").value;
    var password = document.getElementById("password-input").value;
    var confirmarPassword = document.getElementById("password-input2").value;
  
    // Realiza la validación de los campos
    if (nombre === "" || correo === "" || password === "" || confirmarPassword === "") {
      alert("Por favor complete todos los campos.");
      return;
    }
  
    // Valida que el correo electrónico sea válido
    if (!validateEmail(correo)) {
      alert("Por favor ingrese un correo electrónico válido.");
      return;
    }
  
    // Valida que las contraseñas coincidan
    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
  
    // Crea el objeto JSON con los datos ingresados
    var datosUsuario = {
      nombre: nombre,
      correo: correo,
      password: password
    };
  
    // Envía los datos al servidor o base de datos utilizando Axios
    axios.post("/guardar-usuario", datosUsuario)
      .then(function(response) {
        // Envía el correo de confirmación al usuario utilizando un servicio de correo electrónico o función de envío de correo electrónico del servidor
        enviarCorreoConfirmacion(correo);
  
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = "/login.html";
      })
      .catch(function(error) {
        console.error(error);
        alert("Hubo un error al registrar el usuario. Por favor, inténtelo nuevamente más tarde.");
      });
  });
  
  // Función para validar el formato de un correo electrónico
  function validateEmail(correo) {
    var re = /\S+@\S+\.\S+/;
    return re.test(correo);
  }
  
  // Función para enviar el correo de confirmación al usuario
  function enviarCorreoConfirmacion(correo) {
    // Aquí puedes agregar la lógica para enviar el correo utilizando un servicio de correo electrónico o función de envío de correo electrónico del servidor
  }