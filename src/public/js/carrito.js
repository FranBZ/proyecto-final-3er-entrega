/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ Este archivo no se encuentra en funcionamiento... Por favor ignorarlo +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const mostrarCarrito = async () => {
    try {
        const info = await carritoMatchEmail()
        if (info == 'str') {
            const carrito = await crearCarrito()
            imprimirCarrito(carrito.products)
        } else {
            imprimirCarrito(info.products)
        }
    } catch (error) {
        console.error(error)
    }
}

const crearCarrito = async () => {
    try {
        const data = await fetch('http://localhost:8080/api/carrito', { method: 'POST' })
        const info = await data.json()
        return info
    } catch (error) {
        console.error(error)
    }
}

const imprimirCarrito = (productos) => {
    let body = ""
    let total = productos.reduce((acu, prod) => acu + prod.price, 0)
    for (var i = 0; i < productos.length; i++) {      
        body+=` <tr>
                    <td> ${productos[i].name} </td>
                    <td> AR$${productos[i].price} </td>
                    <td> <img src="${productos[i].urlImage}" height="30px"> </td>
                    <td> AR$${productos[i].description} </td>
                    <td> AR$${productos[i].stock} </td>
                </tr>`
    }
    document.getElementById('data').innerHTML = body
    document.getElementById('total').innerHTML = `<h5>Total de la compra: ${total}</h5>`
}

const consultarCarritos = async () => {
    try {
        const data = await fetch('http://localhost:8080/api/carrito')
        const carritos = await data.json()
        return carritos
    } catch (error) {
        console.error('Error al listar los carritos')
    }
}

const consultarSession = async () => {
    try {
        const data = await fetch('http://localhost:8080/api/session')
        const user = await data.json()
        return user.email
    } catch (error) {
        console.error('Error al listar los carritos')
    }
}

export const carritoMatchEmail = async () => {
    try {
        const email = await consultarSession()
        const carritos = await consultarCarritos()
        let response = 'str'
        for (var i = 0; i < carritos.length; i++) {
            if (carritos[i].cartEmail == email) {
                response = carritos[i]
                break
            }
        }
        return response
    } catch (error) {
        console.error('Error al listar los carritos')
    }
}

mostrarCarrito()