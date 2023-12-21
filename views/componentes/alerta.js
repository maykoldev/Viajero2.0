export function mostrarAlerta (mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alert = document.createElement('p');
        alert.classList.add('br-red-100','border-red-400','text-red-700','py-3','px-4','rounded','text-center');
        alert.innerHTML=`
        <strong>Error</strong>
        <span>${mensaje}</span>
        `
        formulario.appendChild(alert);
        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}