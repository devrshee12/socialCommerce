const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    desc: {
        type: String,
        default: ""
    },
    image: [{
        type: String,
    }],
    price: {
        type: Number,
        default: 0
    },
    quantity:{
        type:Number,
        default: 0
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Product", Product);