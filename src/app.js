const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { dbsConfig } = require('./config/dbsConnect.js')
const passport = require('passport')
const path = require('path')
const routerSession = require('./routes/session.routes.js')
const cartRouter = require('./routes/cart.routes.js')
const productsRouter = require('./routes/products.routes.js')
const userRouter = require('./routes/user.routes.js')

/*+++++++++++++++++++++++++
+ CONFIGURACION DE LA APP +
++++++++++++++++++++++++++*/

// Inicializacion
const app = express()

// Configuracion
const PORT = process.env.PORT || process.argv[2] || 8080
const modo = process.argv[3]
app.set('port', PORT)

app.set('views', path.join(__dirname, 'views'))

// Configuracion de template
app.set('view engine', '.ejs')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: dbsConfig.mongodbAtlas.uri,
        mongoOptions: dbsConfig.mongodbAtlas.options
    }),
    secret: 'mongoSecret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Rutas
app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)
app.use('/api', routerSession)
app.use('/api/usuarios', userRouter)
app.get('/:img', (req, res) => res.sendFile(path.join(__dirname, `public/img/${req.params.img}`)))

module.exports = { app, modo }