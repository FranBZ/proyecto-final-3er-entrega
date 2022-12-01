/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ Este archivo no se encuentra en funcionamiento... Por favor ignorarlo +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import { carritoMatchEmail } from "./carrito.js"

const consultarProductos = async () => {
    try {
        const info = await fetch('http://localhost:8080/api/productos')
        const productos = info.json()
        return productos
    } catch (error) {
        console.error(error)
    }
}

const insertarProductos = async productos => {
    const infoCarrito = await carritoMatchEmail()
    let body = ""
    for (var i = 0; i < productos.length; i++) {      
        body+=` <tr>
                    <td> ${productos[i].name} </td>
                    <td> AR$${productos[i].price} </td>
                    <td> <img src="${productos[i].urlImage}" height="30px"> </td>
                    <td> ${productos[i].description} </td>
                    <td> ${productos[i].stock} </td>
                    <td><form action="http://loaclhost:8080/api/carrito/${infoCarrito._id}/productos/${productos[i]._id}" method="post">
                        <button type="submit" class="btn btn-dark">Agregar</button>
                    </form></td>
                </tr>`
    }
    document.getElementById('productos').innerHTML = body
}

const mostrarProductos = async () => {
    const productos = await consultarProductos()
    await insertarProductos(productos)
}

mostrarProductos()