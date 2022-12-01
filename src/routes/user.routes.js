const { Router } = require('express')
const { getUsers } = require('../controllers/user.controller.js')

const userRouter = Router()

// Devuelve todos los usuarios, o un usuario por id
userRouter.get('/:id?', getUsers)

module.exports = userRouter