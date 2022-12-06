const twilio = require('twilio')
const { logger } = require('../config/logger.config.js')

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = twilio(accountSid, authToken)

const enviarMensajeAdmin = async (pedido, usuario) => {

    mensaje = `Nuevo pedido de: ${usuario.nombre} - ${usuario.email}\nPedido:`
    for (let i = 0; i < pedido.length; i++) {
        mensaje += `\n-Producto: ${pedido[i].name}\n-Descripcion: ${pedido[i].description}\n-Precio: ${pedido[i].price}\n`
    }
    const body = mensaje
    const from = 'whatsapp:+14155238886'
    const to = `whatsapp:${process.env.NRO_WSP}`

    try {
        await client.messages.create({ body, from, to })
    } catch (error) {
        logger.error('No se puedo enviar Wsp al administrador')
        console.log(error)
    }
}

const enviarMensajeCliente = async (usuario) => {

    const from = process.env.NRO_TWILIO
    const to = `${usuario.numero}`
    const body = `${usuario.nombre}, tu pedido esta siendo procesado. Te mantendremos informado sobre su estado. \n\nGracias por tu compra!!`

    try {
        await client.messages.create({ body, from, to })
    } catch (error) {
        logger.error('No se puedo enviar SMS al cliente')
        console.log(error)
    }
}

module.exports = { enviarMensajeAdmin, enviarMensajeCliente }