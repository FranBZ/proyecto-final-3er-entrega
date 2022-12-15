const session = require('express-session')
const MongoStore = require('connect-mongo')
const { dbsConfig } = require('./dbsConnect.js')

module.exports = {
    session : session({
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
    })
}