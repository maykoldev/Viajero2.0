const navegacion = document.querySelector('#navegacion');


const crearNavHome = () => {
    navegacion.innerHTML = `
    <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto py-4">
            <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32  pt-3"></a> 
            <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

                <!--menu pc-->
                <div class="hidden md:flex " >
                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>

                <!--menu movil-->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >
                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Login</a>
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>
        </div>
    `
}
//console.log(navegacion)
const crearNavLogin = () => {
    navegacion.innerHTML = `
    <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
            <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32 pt-3"></a> 
            <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

                <!--menu pc-->
                <div class="hidden md:flex " >
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>

                <!--menu movil-->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >

                    <a href="/registro" class=" text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>
        </div>
    `
}
const crearNavReg = () => {
    navegacion.innerHTML = `
    <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
            <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32 pt-3"></a> 
            <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">

             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

                <!--menu pc-->
                <div class="hidden md:flex " >
                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                </div>

                <!--menu movil-->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >

                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                </div>
        </div>
    `
}

const crearNavAdm = () => {
    navegacion.innerHTML = `
    <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
            <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32 pt-3"></a> 
            <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">

             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

                <!--menu pc-->
                <div class="hidden md:flex " >
                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                </div>

                <!--menu movil-->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >

                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                </div>
        </div>
    `
    
}

const crearNavSeat = () => {
    navegacion.innerHTML = `
    <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
            <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32 pt-3"></a> 
            <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">

             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

                <!--menu pc-->
                <div class="hidden md:flex " >
                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                </div>

                <!--menu movil-->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >

                    <a href="/login" class=" text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                </div>
        </div>
    `
    
}

//agregar la ruta para los componentes
if(window.location.pathname === '/'){
    crearNavHome();
}else if(window.location.pathname ==='/login/'){
    crearNavLogin();
}else if(window.location.pathname ==='/registro/'){
    crearNavReg();
}else if(window.location.pathname ==='/admon'){
    crearNavAdm();  
}else if(window.location.pathname ==='/seat'){
    crearNavSeat();
}
const navBtn = navegacion.children[0].children[1]
//console.log(navBtn);

navBtn.addEventListener('click',e=>{
    const menuMobile = navegacion.children[0].children[3];
    //console.log(menuMobile);
    if(!navBtn.classList.contains('active')){
        // menu movil esta cerrado y vamos a mostrarlo
        navBtn.classList.add('active');
  
  
  navBtn.innerHTML= '<path stroke="none" d="M0 0h24v24H0z" fill="none"/>  <path d="M18 6l-12 12" /> <path d="M6 6l12 12" />'
  menuMobile.classList.remove('hidden');
  menuMobile.classList.add('flex'); 
    }else{
        //menu movil esta abierto y vamos a cerrarlo
        navBtn.classList.remove('active');
        navBtn.innerHTML= '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
        menuMobile.classList.remove('flex');
        menuMobile.classList.add('hidden');
    }
})
