const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#correo-input');
const passwordInput = document.querySelector('#password-input');


formulario.addEventListener('submit', async e=>{
    e.preventDefault();
    
    try{
        const newUser ={
            email: emailInput.value,
            password: passwordInput.value
        }

        console.log(newUser)
    }catch(error){

    }
})