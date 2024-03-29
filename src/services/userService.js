const { User } = require('../models/User.js')
const { logger } = require('../config/logger.config.js')
const { borrarImagenUsuario } = require('../utils/borrarFotoRegistroError.js')
const MongoConteiner = require('../database/mongo.js')
require('../config/passport.config.js')

const prefijos = [
    "+93",
    "+965",
    "+355",
    "+266",
    "+49",
    "+371",
    "+376",
    "+961",
    "+244",
    "+231",
    "+1264",
    "+218",
    "+672",
    "+41",
    "+1268",
    "+370",
    "+599",
    "+352",
    "+966",
    "+853",
    "+213",
    "+389",
    "+54",
    "+261",
    "+374",
    "+60",
    "+297",
    "+265",
    "+247",
    "+960",
    "+61",
    "+223",
    "+43",
    "+356",
    "+994",
    "+212",
    "+1242",
    "+596",
    "+973",
    "+230",
    "+880",
    "+222",
    "+1246",
    "+269",
    "+375",
    "+52",
    "+32",
    "+95",
    "+501",
    "+373",
    "+229",
    "+377",
    "+1441",
    "+976",
    "+975",
    "+1664",
    "+591",
    "+258",
    "+387",
    "+264",
    "+267",
    "+674",
    "+55",
    "+977",
    "+673",
    "+505",
    "+359",
    "+227",
    "+226",
    "+234",
    "+257",
    "+683",
    "+238",
    "+47",
    "+855",
    "+687",
    "+237",
    "+64",
    "+1",
    "+968",
    "+235",
    "+31",
    "+420",
    "+92",
    "+56",
    "+680",
    "+86",
    "+970",
    "+357",
    "+507",
    "+57",
    "+675",
    "+269",
    "+595",
    "+225",
    "+51",
    "+506",
    "+872",
    "+385",
    "+689",
    "+53",
    "+48",
    "+45",
    "+351",
    "+253",
    "+1",
    "+1767",
    "+974",
    "+593",
    "+44",
    "+20",
    "+236",
    "+503",
    "+82",
    "+971",
    "+353",
    "+291",
    "+242",
    "+421",
    "+243",
    "+386",
    "+850",
    "+34",
    "+856",
    "+691",
    "+1809",
    "+1",
    "+262",
    "+372",
    "+250",
    "+79",
    "+40",
    "+251",
    "+7",
    "+679",
    "+212",
    "+63",
    "+685",
    "+358",
    "+684",
    "+33",
    "+378",
    "+241",
    "+508",
    "+220",
    "+1784",
    "+995",
    "+290",
    "+233",
    "+1869",
    "+350",
    "+1758",
    "+1473",
    "+239",
    "+30",
    "+221",
    "+299",
    "+42",
    "+590",
    "+248",
    "+1671",
    "+232",
    "+502",
    "+65",
    "+44",
    "+963",
    "+224",
    "+252",
    "+240",
    "+94",
    "+594",
    "+268",
    "+245",
    "+27",
    "+592",
    "+249",
    "+509",
    "+46",
    "+504",
    "+41",
    "+852",
    "+597",
    "+36",
    "+66",
    "+91",
    "+886",
    "+62",
    "+992",
    "+964",
    "+255",
    "+98",
    "+246",
    "+61",
    "+670",
    "+354",
    "+670",
    "+1345",
    "+228",
    "+682",
    "+690",
    "+1670",
    "+676",
    "+289",
    "+1868",
    "+500",
    "+216",
    "+692",
    "+993",
    "+672",
    "+90",
    "+677",
    "+688",
    "+1649",
    "+380",
    "+808",
    "+256",
    "+1284",
    "+7",
    "+1340",
    "+598",
    "+44",
    "+998",
    "+972",
    "+678",
    "+39",
    "+379",
    "+1876",
    "+58",
    "+81",
    "+84",
    "+44",
    "+681",
    "+962",
    "+967",
    "+7",
    "+381",
    "+254",
    "+243",
    "+996",
    "+260",
    "+686",
    "+263",
]

class UserService extends MongoConteiner {

    static instance

    constructor() {
        super(User)
    }

    static getInstance() {
        if (UserService.instance) {
            return UserService.instance;
        }
        UserService.instance = new UserService();
        return UserService.instance;
    }

    async signup(req, res) { // registrando usuario

        const { email, password, nombre, edad, direccion, prefijo, numero, pathFoto } = req.body

        try {
            if (!email && !password && !nombre && !edad && !direccion && !numero && !pathFoto && !prefijo) {
                borrarImagenUsuario()
                logger.warn(`Error al registrarse`)
                return res.redirect("/api/error-registro")
            }

            // Comprobando si contiene prefijo
            if (!prefijos.includes(prefijo)) {
                borrarImagenUsuario()
                logger.warn(`Error al registrarse`)
                return res.redirect("/api/error-registro")
            }

            // Comprobando que no existen el mail
            const users = await super.getAll()
            let userFound = users.find(user => user.email == email)

            if (userFound) {
                borrarImagenUsuario()
                logger.error(`Error al registrarse`)
                return res.redirect("/api/error-registro")
            }

            const numeroTel = prefijo + numero

            // Guardando el usuario
            const newUser = new User({ email, password, nombre, edad, direccion, numero: numeroTel, foto: pathFoto })
            newUser.password = await newUser.encryptPassword(password)
            logger.info('Usuario nuevo registrado')
            await super.save(newUser)

            return res.redirect("/api/login")

        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }

    }

    // deslogueando usuario
    async logout(req, res, next) {
        let idSession = await req.session.passport.user
        let userInfo = await super.getById(idSession)
        let nombre = userInfo[0].nombre
        await req.logout((err) => {
            if (err) return next(err)
            return res.render("saludo", { nombre })
        })
    }

    // comprobando autenticaicon
    auth(req, res, next) {
        if (req.isAuthenticated()) {
            logger.info("Usuario que consulta esta ruta: ", req.session.passport.user)
            return next()
        } else {
            logger.warn(`Error al loguearse`)
            return res.redirect('/api/login')
        }
    }

    // Funcion para obtener todos los usuarios
    async getUsers(req, res) {
        const { id } = req.params
        if (id) {
            try {
                const user = await super.getById(id)
                res.status(200).send(user)
            } catch (error) {
                res.status(400).json({ message: `usuario con id no encontrado ${id}` })
            }
        } else {
            try {
                const users = await super.getAll()
                res.status(200).send(users)                
            } catch (error) {
                res.status(400).json({ message: `error al listar usuarios` })
            }
        }
    }

    // Redirigir a home
    async home(req, res) {
        let idSession = await req.session.passport.user
        let user = await super.getById(idSession)
        res.render('home', { user: user[0] })
    }
}

module.exports = UserService







