const fs = require('fs')
const path = require('path')

exports.borrarImagenUsuario = () => {
    const fotos = fs.readdirSync('./src/public/img') 
    fs.unlinkSync(path.join('./src/public/img', fotos[fotos.length -1]))
}