const { Schema, model } = require("mongoose")

const comprasCollection = 'compras'

const comprasSchema = Schema({
    products: {
        type: Array,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

exports.Compras = model(comprasCollection, comprasSchema)