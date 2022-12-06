const CartService = require('../services/cartService.js')
const cart = new CartService()

const getCarts = async (req, res) => {
    try {
        await cart.getCarts(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveCart = async (req, res) => {    // Esta funcion guarda un carrito nuevo
    try {
        await cart.saveCart(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const deleteCartById = async (req, res) => {   // Esta funcion elimina un carrito segun su ID
    try { 
        await cart.deleteCartById(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const getProductsFromCart = async (req, res) => { // Esta funcion muestra todos los productos de un carrito
    try {
        await cart.getProductsFromCart(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveProductInCartByID = async (req, res) => { // Esta funcion guarda un producto en un carrito
    try {
        await cart.saveProductInCartByID(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const deleteProductFromCartByID = async (req, res) => { // Esta funcion borra un producto de un carrito
    try {
        await cart.deleteProductFromCartByID(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const byCartByID = async (req, res) => {  // Esta funcion me permite comprar un carrito
    try {
        await cart.buyCart(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

module.exports = {
    getCarts,
    saveCart,
    deleteCartById,
    getProductsFromCart,
    saveProductInCartByID,
    deleteProductFromCartByID,
    byCartByID
}