const UserService = require('../services/userService.js')
const userService = UserService.getInstance()
const passport = require('passport')

const signup = async (req, res) => {
    try {
        await userService.signup(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

// Logueando usuario
const signin = passport.authenticate('local', {
    successRedirect: "/api/home",
    failureRedirect: "/api/error-login",
})

// deslogueando usuario
const logout = async (req, res, next) => {
    try {
        await userService.logout(req, res, next)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

// comprobando autenticaicon
const auth = (req, res, next) => {
    try {
        userService.auth(req, res, next)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

// Funcion para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers(req, res)
        return users
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }
}

// Redirigir a home
const home = async (req, res) => {
    try {
        await userService.home(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
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