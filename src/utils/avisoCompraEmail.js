const { createTransport } = require('nodemailer')
const { logger } = require('../config/logger.config.js')

const enviarMail = async (pedido, usuario) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.TEST_MAIL,
            pass: process.env.TEST_MAIL_PASS
        }
    })

    let body = pedido.reduce((acu, ped) => {
        acu += `   <tr>
                        <td> ${ped.name} </td>
                        <td> ${ped.description} </td>
                        <td> ${ped.price} </td>
                    </tr>`
        return acu
    }, '')

    const mailOptions = {
        from: `Nodemailer - ${process.env.TEST_MAIL}`,
        to: process.env.TEST_MAIL,
        subject: `Nuevo pedido de: ${usuario.nombre} - ${usuario.email}`,
        html: ` <table>
                    <thead>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                    </thead>
                    <tbody>${body}</tbody>
                </table>`,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        logger.error('No se puedo enviar Email al administrador')
        console.log(error)
    }
}

module.exports = { enviarMail }