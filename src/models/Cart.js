const { Schema, model } = require("mongoose")

const cartCollection = 'carts'

const cartSchema = Schema({
    products: {
        type: Array,
    },
    userID: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

exports.Cart = model(cartCollection, cartSchema)