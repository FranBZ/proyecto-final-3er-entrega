const fs = require('fs')

exports.asignarPathFotoMongo = (req, res, next) => {
    const fotos = fs.readdirSync('./src/public/img')
    req.body.pathFoto = fotos[fotos.length -1]
    next()
}