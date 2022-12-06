const { Schema, model } = require("mongoose")

const productsCollection = "products"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    urlImage: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    code: {
        type: Number,
        required: true
    }, 
    stock: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

exports.Product = model(productsCollection, productSchema)