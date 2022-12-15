const UserService = require('../services/userService.js')
const userService = UserService.getInstance()

const signup = async (req, res) => {
    try {
        await userService.signup(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

// Logueando usuario
const signin = () => {
    userService.signin()
}

// deslogueando usuario
const logout = async (req, res, next) => {
    try {
        await userService.logout(req, res, next)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

// comprobando autenticaicon
const auth = (req, res, next) => {
    try {
        userService.auth(req, res, next)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

// Funcion para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        await userService.getUsers(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

// Redirigir a home
const home = async (req, res) => {
    try {
        await userService.home(req, res)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

module.exports = {
    signup,
    getUsers,
    signin,
    logout,
    auth,
    home
}