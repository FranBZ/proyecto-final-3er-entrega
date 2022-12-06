const ProductService = require('../services/productService.js')
const product = new ProductService()

const getProductById = async (req, res) => {  // Esta funcion devuelve un producto segun su ID
    try {
       await product.getProductById(req, res)    
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }  
}

const saveProduct = async (req, res) => {        // Guarda un prodcuto nuevo
    try {
        await product.saveProduct(req, res)                                                              // Se lo pasamos al contendor
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

const updateProductByID = async (req, res) => {  // Recibe y actualiza un producto según su id.
    try {
        await product.updateProductByID(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}


const deleteProductById = async (req, res) => {   // Esta funcion elimina un producto segun su ID
    try {
        await product.deleteProductById(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

module.exports = {
    getProductById,
    saveProduct,
    updateProductByID,
    deleteProductById
}