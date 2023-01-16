const { Router } = require('express')
const { auth } = require('../controllers/users.controller')
const { getUsers } = require('../controllers/users.controller.js')

const userRouter = Router()

// Devuelve todos los usuarios, o un usuario por id
userRouter.get('/:id?', auth, getUsers)

module.exports = userRouter