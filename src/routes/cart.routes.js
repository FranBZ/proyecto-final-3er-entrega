const { Router } = require('express')
const { 
    saveCart, 
    deleteCartById, 
    getProductsFromCart, 
    saveProductInCartByID, 
    deleteProductFromCartByID, 
    getCarts, byCartByID 
} = require('../controllers/carts.controller.js')

const cartRouter = Router()

//* El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:

//1. POST: '/' - Crea un carrito a un cliente por su id y devuelve id de carrito.
cartRouter.post('/:id', saveCart)

//2. DELETE: '/:id' - Vacía un carrito y lo elimina.
cartRouter.delete('/:id', deleteCartById)

//3. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
cartRouter.get('/:id/productos', getProductsFromCart)

//4. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
cartRouter.post('/:idCart/productos/:idProd', saveProductInCartByID)

//5. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
cartRouter.delete('/:id_cart/productos/:id_prod', deleteProductFromCartByID)

//6 GET '/' - Me permite listar todos los carritos o un carrito por su id
cartRouter.get('/:id?', getCarts)

//7 POST '/comprar/:id' - Me permite comprar el carrito por su id y guardar la compra en la base de datos
cartRouter.post('/comprar/:id', byCartByID)

module.exports = cartRouter