const { Router } = require('express')
const { logout, signin, signup, auth, userInfo } = require('../controllers/user.controller.js')
const { upload } = require('../utils/multer.config.js')
const { asignarPathFotoMongo } = require('../utils/asignarPathFotoMongo.js')

/*+++++++++++
+ ENRUTADOR +
++++++++++++*/

const routerSession = Router()

routerSession.get('/home', auth, async (req, res) => {
    let idSession = await req.session.passport.user
    let user = await userInfo(idSession)
    res.render('home', { user })
})

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