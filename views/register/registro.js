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
        input.classList.add('focus:outline-green-700', 'outline-4')
    } else if (input.value === ' ') {
        input.classList.remove('focus:outline-green-400', 'outline-4');
        input.classList.remove('focus:outline-red-700', 'outline-4')
        input.classList.add('focus:outline-red-900', 'outline-4')
    } else {
        input.classList.remove('focus:outline-green-700', 'outline-4');
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
        console.log(newUser);
        

        const response = await axios.post('/api/users', newUser)//ALIAS(/api/users) //debo indicarle la ruta a nivel de backend
        console.log(response)
        window.location.href = '/login';
        // Restablecer el estilo del campo de correo electrónico
        emailInput.classList.remove('focus:outline-red-700', 'outline-4');
        emailInput.classList.remove('focus:outline-red-900', 'outline-4');
        emailInput.classList.remove('focus:outline-green-700', 'outline-4');
        createNotification(false,response.data.msg);

       // console.log(newUser)
    }catch(error){
        console.log(error)
        // Marcar el campo de correo electrónico en rojo
        emailInput.classList.remove('focus:outline-green-700', 'outline-4');
        emailInput.classList.remove('focus:outline-red-900', 'outline-4');
        emailInput.classList.add('focus:outline-red-700', 'outline-4');

        // Mostrar una alerta debajo del campo de correo electrónico
        const errorAlert = document.createElement('p');
        errorAlert.className = 'text-red-700 text-xs';
        errorAlert.textContent = error.response.data.error;

        const parentDiv = emailInput.parentElement;
        parentDiv.appendChild(errorAlert);

        // Agregar un evento para eliminar la alerta cuando se modifique el correo
        emailInput.addEventListener('input', () => {
            emailInput.classList.remove('focus:outline-red-700', 'outline-4');
            emailInput.classList.remove('focus:outline-red-900', 'outline-4');
            emailInput.classList.add('focus:outline-green-700', 'outline-4');
            if (parentDiv.contains(errorAlert)) {
                parentDiv.removeChild(errorAlert);
            }
        });

        // Notificación de error
        createNotification(true, error.response.data.error);
    }
  
})