const { Router } = require('express')
const { auth } = require('../controllers/users.controller')
const { 
    getProductById, 
    saveProduct, 
    updateProductByID, 
    deleteProductById 
} = require('../controllers/products.controller.js')

const productsRouter = Router()

// El router base '/api/productos' implementará cuatro funcionalidades:

//1. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto  por su id (disponible para usuarios y administradores)
productsRouter.get('/:id?', auth, getProductById)

//2. POST: '/' - Para incorporar productos al listado (disponible para administradores)
productsRouter.post('/', auth, saveProduct)

//3. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
productsRouter.put('/:id', auth, updateProductByID)

//4. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
productsRouter.delete('/:id', auth, deleteProductById)

module.exports = productsRouter