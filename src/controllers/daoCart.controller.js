const CartDaoMongo = require("../daos/cartDaoMongo.js")
const cartDao = new CartDaoMongo()

const getCarts = async (req, res) => {
    try {
        await cartDao.getCarts(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveCart = async (req, res) => {    // Esta funcion guarda un carrito nuevo
    try {
        await cartDao.saveCart(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const deleteCartById = async (req, res) => {   // Esta funcion elimina un carrito segun su ID
    try { 
        await cartDao.deleteCartById(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const getProductsFromCart = async (req, res) => { // Esta funcion muestra todos los productos de un carrito
    try {
        await cartDao.getProductsFromCart(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveProductInCartByID = async (req, res) => { // Esta funcion guarda un producto en un carrito
    try {
        await cartDao.saveProductInCartByID(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const deleteProductFromCartByID = async (req, res) => { // Esta funcion borra un producto de un carrito
    try {
        await cartDao.deleteProductFromCartByID(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const byCartByID = async (req, res) => {  // Esta funcion me permite comprar un carrito
    try {
        await cartDao.buyCart(req, res)
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