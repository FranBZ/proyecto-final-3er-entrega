const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ CONFIGURACION DEL MODELO NECESARIO PARA PERCISTENCIA DE USUARIOS EN MONGODB +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

const usersCollection = 'user'

const userSchema = Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

exports.User = model(usersCollection, userSchema)