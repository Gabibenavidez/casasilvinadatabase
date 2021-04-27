const mongoose = require("../bin/mogodb");
const errorMessage = require("../util/errorMessage");
const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
const salesSchema = new mongoose.Schema({
    Date: {
        type: Date,
    },
    user: String,
    product: String,
    amount: Number,
    status: ["Pendiente de pago","Pago"]
})
const productosSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        minlength: [1, errorMessage.GENERAL.minlength],
        maxlength: 255,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        trim: true
    },
    sku: {
        type: String,
        unique: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        minlength: 1,
        required: true
    },
    offerPrice: {
        type: Number,
        minlength: 1,
    },
    img: String,
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        trim: true
    },
    quantity: Number,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    },
    tags: [tagsSchema],
    sales: [salesSchema]
});

module.exports = mongoose.model("productos", productosSchema);