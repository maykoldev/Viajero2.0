const url = 'http://localhost:3000/menu';

export const nuevoProducto = async producto => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
}
//para consultar todos los productos
export const obtenerProductos = async () => {
    try {
        const resultado = await fetch(url);
        const productos = await resultado.json();
        return productos;
    } catch (error) {
        console.log(error)
    }
}
//para consultar un producto
export const obtenerProducto = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const producto = resultado.json();
        return producto;
    } catch (error) {
        console.log(error)
    }
}
//editar producto 
export const editarProducto = async producto => {
    try {
        await fetch(`${url}/${producto.id}`, {
            method: 'PUT',//para actualizar un elemento en especifico
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
}
//eliminar producto
export const eliminarProducto = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error);
    }
}