const MongoConteiner = require("../database/mongo.js")
const { Cart } = require('../models/Cart.js')
const { Product } = require('../models/Products.js')
const { Compras } = require('../models/Compras.js')
const ProductService = require('./productService.js')
const { userInfo } = require("../controllers/users.controller.js")
const { enviarMensajeCliente, enviarMensajeAdmin } = require("../utils/avisoCompraWSP.js")
const { enviarMail } = require("../utils/avisoCompraEmail.js")

const prodCollection = new ProductService(Product)

class CartService extends MongoConteiner {

    constructor() {
        super(Cart)
    }

    async getCarts(req, res) {
        const { id } = req.params
        try {
            if (!id) {
                const carts = await super.getAll()
                res.status(200).send(carts)
            } else {
                const cart = await super.getById(id)
                if (cart) {
                    res.status(200).send(cart)
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            }

        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

    async saveCart(req, res) {
        const { id } = req.params
        try {
            const info = await super.save({ products: [], userID: id })
            res.send(info)
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }

    }

    async deleteCartById(req, res) {   // Esta funcion elimina un carrito segun su ID
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ error: 'Es necesario un _id' })
            } else {
                await super.deleteById(id)
                res.status(200).json({ error: 'Carrito borrado con exito' })
            }
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

    async getProductsFromCart(req, res) { // Esta funcion muestra todos los productos de un carrito

        const { id } = req.params
        try {
            const cart = await super.getById(id)
            res.status(200).send(cart[0].products)
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

    async saveProductInCartByID(req, res) { // Esta funcion guarda un producto en un carrito
        const { idCart } = req.params
        const { idProd } = req.params
        try {
            const cart = await super.getById(idCart)
            if (cart) {
                let prod = await prodCollection.getById(idProd)
                cart[0].products.push(prod[0])
                await super.updateById(cart[0])
                res.status(200).json({ messaje: 'productos agregados con exito' })
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

    async deleteProductFromCartByID(req, res) { // Esta funcion borra un producto de un carrito

        const { id_cart, id_prod } = req.params

        try {
            const cart = await super.getById(id_cart)
            if (cart) {
                const prodIndex = cart[0].products.findIndex(product => product._id == id_prod)
                if (prodIndex != -1) {
                    cart[0].products.splice(prodIndex, 1)
                    await super.updateById(cart[0])
                    res.status(200).json({ messaje: 'producto borrado con éxito' })
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }

        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

    async buyCart(req, res) {
        const { id } = req.params
        if (id) {
            try {
                const cart = await super.getById(id)
                const usuario = await userInfo(cart[0].userID)
                const compra = {
                    products: cart[0].products, 
                    userID: cart[0].userID
                }
                const compraGuardada = await Compras.create(compra)
                await enviarMensajeAdmin(cart[0].products, usuario)
                await enviarMail(cart[0].products, usuario)
                await enviarMensajeCliente(usuario)
                res.status(200).json({ message: 'carrito comprado - mensajes enviados' })
            } catch (error) {
                res.status(400).json({ error: 'no se pudo enviar confirmacion de compra' })
            }
        } else {
            res.status(400).json({ error: 'debe especificar un id valido' })
        }
    }
}

module.exports = CartService