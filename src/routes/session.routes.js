const { Router } = require('express')
const { logout, signin, signup, auth, home } = require('../controllers/users.controller.js')
const { upload } = require('../middlewares/multer.config.js')
const { asignarPathFotoMongo } = require('../middlewares/asignarPathFotoMongo.js')

/*+++++++++++
+ ENRUTADOR +
++++++++++++*/

const routerSession = Router()

// Home
routerSession.get('/home', auth, home)

// Registro
routerSession.get('/error-registro', (req, res) => res.render('errorRegistro'))
routerSession.get('/registro', (req, res) => res.render('registro'))
routerSession.post('/registro', upload, asignarPathFotoMongo, signup)

// Login
routerSession.get('/error-login', (req, res) => res.render('errorLogin'))
routerSession.get('/login', (req, res) => res.render('login'))
routerSession.post('/login', signin)

// Logout
routerSession.get('/logout', logout)

module.exports = routerSession