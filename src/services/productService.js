const MongoConteiner = require('../database/mongo.js')
const { Product } = require('../models/Products.js')

const administrador = true

class ProductService extends MongoConteiner {

    constructor() {
        super(Product)
    }

    async getProductById(req, res) {  // Esta funcion devuelve un producto segun su ID o devuelve todos
        const { id } = req.params
        try {
            if (!id) {
                const productos = await super.getAll()
                res.status(200).send(productos)
            } else {
                const product = await super.getById(id)
                if (product) {
                    res.status(200).send(product)
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            }

        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }

    async saveProduct(req, res) {        // Guarda un prodcuto nuevo
        if (administrador == true) {
            const { name, price, urlImage, description, code, stock } = req.body

            if (!name || !price || !urlImage || !description || !code || !stock) {
                res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
            } else {

                const product = req.body
                try {
                    await super.save(product)
                    res.status(200).json({ messaje: 'producto guardado con exito' })
                } catch (error) {
                    res.status(400).json({ error: `${error}` })
                }
            }
        } else {
            res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
        }
    }

    async updateProductByID(req, res) {  // Recibe y actualiza un producto según su id.
        if (administrador == true) {
            const { id } = req.params                                                                   // Tomamos el ID
            const { name, price, urlImage, description, code, stock } = req.body                        // Tomamos el cuerpo

            if (!name || !price || !urlImage || !description || !code || !stock) {                    // Comprobamos que el cuerpo este completo
                res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
            } else {
                try {
                    const product = await super.getById(id)
                    if (product) {
                        product[0].name = name
                        product[0].price = price
                        product[0].urlImage = urlImage
                        product[0].description = description
                        product[0].code = code
                        product[0].stock = stock
                        await super.updateById(product[0])
                        res.status(200).json({ messaje: 'producto actualizado con exito' })
                    } else {
                        res.status(400).json({ error: 'producto no encontrado' })
                    }
                } catch (error) {
                    res.status(400).json({ error: `${error}` })
                }
            }
        } else {
            res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
        }
    }

    async deleteProductById(req, res) {   // Esta funcion elimina un producto segun su ID
        if (administrador == true) {
            const { id } = req.params
            try {
                await super.deleteById(id)
                res.status(200).json({ messaje: 'producto borrado con exito' })
            } catch (error) {
                res.status(400).json({ error: `${error}` })
            }
        } else {
            res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
        }
    }
}

module.exports = ProductService