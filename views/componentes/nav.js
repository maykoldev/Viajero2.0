const navegacion = document.querySelector('#navegacion');
const navAdmin = document.querySelector('#navADM')
const navRutas = document.querySelector('#navRutas');


const crearNavHome = () => {
        navegacion.innerHTML = `
            <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto py-4">
                <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32 pt-3"></a> 
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <!-- Menú PC -->
                <div class="hidden md:flex " >
                    <a href="/login" class="text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>

                <!-- Menú móvil -->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >
                    <a href="/login" class="text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Login</a>
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>
            </div>
        `;
    }


//console.log(navegacion)
const crearNavLogin = () => {    
        navegacion.innerHTML = `
            <div class="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto py-4">
                <a href="/" class="w-32"><img src="/img/LOGO2.png" alt="" class="w-32 pt-3"></a> 
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-10 h-10 text-white cursor-pointer p-2 hover:bg-blue-500 rounded-lg md:hidden z-50">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <!-- Menú PC -->
                <div class="hidden md:flex " >
                    <a href="/login" class="text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full">Login</a>
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>

                <!-- Menú móvil -->
                <div class="z-40 bg-blue-700 fixed top-0 right-0 left-[50%] bottom-0 flex-col justify-start pt-12 items-center gap-4 hidden" >
                    <a href="/login" class="text-white font-bold hover:bg-blue-400 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Login</a>
                    <a href="/registro" class="bg-blue-500 text-white hover:text-black font-bold hover:bg-blue-300 py-2 px-4 rounded-lg transition ease-in-out w-full text-center">Registro</a>
                </div>
            </div>
        `;
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
    navAdmin.innerHTML = `
    <div class="w-full container mx-auto flex flex-col items-center mt-0 pt-3 pb-3 z-10">
			
        <div class="flex gap-48 items-center justify-center w-full">
			<div class="w-auto pl-2 md:pl-0 float-start mr-auto">
				<a href="/admon" class="w-auto">
                    <img src="/img/LOGO2.png" alt="" class="w-32 py-4 mx-4 md:w-36">
                </a>
            </div>
            
			<div class="w-auto float-end pr-0 ml-auto">
				<div class="flex relative  float-right">
				
				  <div class="relative text-sm text-blue-100">
					  <button id="userButton" class="flex items-center focus:outline-none mr-3">
						<img class="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User"> <span class="hidden md:inline-block text-blue-100">Hi, User</span>
						<svg class="pl-2 h-2 fill-current text-blue-100" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/></g></svg>
					  </button>
					  <div id="userMenu" class="bg-blue-900 rounded shadow-md absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
						  <ul class="list-reset">
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Mi Cuenta</a></li>
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Notificationes</a></li>
							<li><hr class="border-t mx-2 border-blue-400"></li>
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Salir</a></li>
						  </ul>
					  </div>
				  </div>


					<div class="block lg:hidden pr-4">
					<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-600 hover:text-blue-100 hover:border-teal-500 appearance-none focus:outline-none">
						<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
					</button>
				</div>
				</div>

			</div>
        </div>

			<div class="w-full flex-grow lg:flex lg:items-center lg:w-full hidden py-2 px-2 rounded  mt-2 lg:mt-0 bg-blue-700 z-20" id="nav-content">
				<ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0 uppercase font-bold">
					<li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/admon" class="block py-1 md:py-3 pl-1 align-middle text-blue-400 no-underline hover:text-white border-b-2 border-blue-400 hover:border-blue-400">
                            <i class="fas fa-home fa-fw mr-3 text-blue-400"></i><span class="pb-1 md:pb-0 text-sm">Home</span>
                        </a>
                    </li>
					<li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/proveedor" id="proveedor" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-pink-400">
                            <i class="fa-solid fa-bus mr-3"></i><span class="pb-1 md:pb-0 text-sm">Proveedores</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="asistente" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-green-400">
                            <i class="fas fa-tasks fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Pagos</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="usuarios" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-pink-400">
                            <i class="fa-solid fa-users mr-3"></i><span class="pb-1 md:pb-0 text-sm">Usuarios</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="msj" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-purple-400">
                            <i class="fa fa-envelope fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Mensajes</span>
                        </a>
                    </li>
                    
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/rutas" id="rutas" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-red-400">
                            <i class="fa fa-wallet fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Rutas</span>
                        </a>
                    </li>
				</ul>
				
				<div class="relative pull-right pl-4 pr-4 md:pr-0">
                    <input type="search" placeholder="Search" class="w-full bg-blue-900 text-sm text-blue-400 transition border border-blue-800 focus:outline-none focus:border-blue-600 rounded py-1 px-2 pl-10 appearance-none leading-normal">
                    <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                        <svg class="fill-current pointer-events-none text-blue-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div>
				
			</div>
			
		</div>
    `
    
}

const crearNavPro = ()=> {
    navProveedor.innerHTML=`
    <div class="w-full container mx-auto flex flex-col items-center mt-0 pt-3 pb-3 z-10">
			
        <div class="flex gap-48 items-center justify-center w-full">
			<div class="w-auto pl-2 md:pl-0 float-start mr-auto">
				<a href="/admon" class="w-auto">
                    <img src="/img/LOGO2.png" alt="" class="w-32 py-4 mx-4 md:w-36">
                </a>
            </div>
            
			<div class="w-auto float-end pr-0 ml-auto">
				<div class="flex relative  float-right">
				
				  <div class="relative text-sm text-blue-100">
					  <button id="userButton" class="flex items-center focus:outline-none mr-3">
						<img class="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User"> <span class="hidden md:inline-block text-blue-100">Hi, User</span>
						<svg class="pl-2 h-2 fill-current text-blue-100" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/></g></svg>
					  </button>
					  <div id="userMenu" class="bg-blue-900 rounded shadow-md absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
						  <ul class="list-reset">
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Mi Cuenta</a></li>
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Notificationes</a></li>
							<li><hr class="border-t mx-2 border-blue-400"></li>
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Salir</a></li>
						  </ul>
					  </div>
				  </div>


					<div class="block lg:hidden pr-4">
					<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-600 hover:text-blue-100 hover:border-teal-500 appearance-none focus:outline-none">
						<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
					</button>
				</div>
				</div>

			</div>
        </div>

			<div class="w-full flex-grow lg:flex lg:items-center lg:w-full hidden py-2 px-2 rounded  mt-2 lg:mt-0 bg-blue-700 z-20" id="nav-content">
				<ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0 uppercase font-bold">
					<li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/admon" class="block py-1 md:py-3 pl-1 align-middle text-blue-400 no-underline hover:text-white border-b-2 border-blue-400 hover:border-blue-400">
                            <i class="fas fa-home fa-fw mr-3 text-blue-400"></i><span class="pb-1 md:pb-0 text-sm">Home</span>
                        </a>
                    </li>
					<li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/proveedor" id="proveedor" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-pink-400  hover:border-pink-400">
                            <i class="fa-solid fa-bus mr-3"></i><span class="pb-1 md:pb-0 text-sm">Proveedores</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="asistente" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-green-400">
                            <i class="fas fa-tasks fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Pagos</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="usuarios" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-pink-400">
                            <i class="fa-solid fa-users mr-3"></i><span class="pb-1 md:pb-0 text-sm">Usuarios</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="msj" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-purple-400">
                            <i class="fa fa-envelope fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Mensajes</span>
                        </a>
                    </li>
                    
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/rutas" id="rutas" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-red-400">
                            <i class="fa fa-wallet fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Rutas</span>
                        </a>
                    </li>
				</ul>
				
				<div class="relative pull-right pl-4 pr-4 md:pr-0">
                    <input type="search" placeholder="Search" class="w-full bg-blue-900 text-sm text-blue-400 transition border border-blue-800 focus:outline-none focus:border-blue-600 rounded py-1 px-2 pl-10 appearance-none leading-normal">
                    <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                        <svg class="fill-current pointer-events-none text-blue-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div>
				
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
const crearNavRes = () => {
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
const crearNavRutas = ()=> {
    navRutas.innerHTML=`
    <div class="w-full container mx-auto flex flex-col items-center mt-0 pt-3 pb-3 z-10">
			
        <div class="flex gap-48 items-center justify-center w-full">
			<div class="w-auto pl-2 md:pl-0 float-start mr-auto">
				<a href="/admon" class="w-auto">
                    <img src="/img/LOGO2.png" alt="" class="w-32 py-4 mx-4 md:w-36">
                </a>
            </div>
            
			<div class="w-auto float-end pr-0 ml-auto">
				<div class="flex relative  float-right">
				
				  <div class="relative text-sm text-blue-100">
					  <button id="userButton" class="flex items-center focus:outline-none mr-3">
						<img class="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User"> <span class="hidden md:inline-block text-blue-100">Hi, User</span>
						<svg class="pl-2 h-2 fill-current text-blue-100" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/></g></svg>
					  </button>
					  <div id="userMenu" class="bg-blue-900 rounded shadow-md absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
						  <ul class="list-reset">
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Mi Cuenta</a></li>
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Notificationes</a></li>
							<li><hr class="border-t mx-2 border-blue-400"></li>
							<li><a href="#" class="px-4 py-2 block text-blue-100 hover:bg-blue-800 no-underline hover:no-underline">Salir</a></li>
						  </ul>
					  </div>
				  </div>


					<div class="block lg:hidden pr-4">
					<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-600 hover:text-blue-100 hover:border-teal-500 appearance-none focus:outline-none">
						<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
					</button>
				</div>
				</div>

			</div>
        </div>

			<div class="w-full flex-grow lg:flex lg:items-center lg:w-full hidden py-2 px-2 rounded  mt-2 lg:mt-0 bg-blue-700 z-20" id="nav-content">
				<ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0 uppercase font-bold">
					<li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/admon" class="block py-1 md:py-3 pl-1 align-middle text-blue-400 no-underline hover:text-white border-b-2 border-blue-400 hover:border-blue-400">
                            <i class="fas fa-home fa-fw mr-3 text-blue-400"></i><span class="pb-1 md:pb-0 text-sm">Home</span>
                        </a>
                    </li>
					<li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/proveedor" id="proveedor" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-pink-400">
                            <i class="fa-solid fa-bus mr-3"></i><span class="pb-1 md:pb-0 text-sm">Proveedores</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="asistente" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-green-400">
                            <i class="fas fa-tasks fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Pagos</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="usuarios" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-pink-400">
                            <i class="fa-solid fa-users mr-3"></i><span class="pb-1 md:pb-0 text-sm">Usuarios</span>
                        </a>
                    </li>
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="#" id="msj" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-blue-900  hover:border-purple-400">
                            <i class="fa fa-envelope fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Mensajes</span>
                        </a>
                    </li>
                    
                    <li class="mr-6 my-2 md:my-0 text-ellipsis">
                        <a href="/rutas" id="rutas" class="block py-1 md:py-3 pl-1 align-middle text-blue-500 no-underline hover:text-blue-100 border-b-2 border-red-400  hover:border-red-400">
                            <i class="fa fa-wallet fa-fw mr-3"></i><span class="pb-1 md:pb-0 text-sm">Rutas</span>
                        </a>
                    </li>
				</ul>
				
				<div class="relative pull-right pl-4 pr-4 md:pr-0">
                    <input type="search" placeholder="Search" class="w-full bg-blue-900 text-sm text-blue-400 transition border border-blue-800 focus:outline-none focus:border-blue-600 rounded py-1 px-2 pl-10 appearance-none leading-normal">
                    <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                        <svg class="fill-current pointer-events-none text-blue-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div>
				
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
}else if(window.location.pathname ==='/admon/'){
    crearNavAdm();  
}else if(window.location.pathname ==='/seat/'){
    crearNavSeat();
}else if(window.location.pathname ==='/res/'){
    crearNavRes();
}else if(window.location.pathname ==='/proveedor/'){
    crearNavAdm();
}else if(window.location.pathname==='/rutas/'){
    crearNavRutas();
}



