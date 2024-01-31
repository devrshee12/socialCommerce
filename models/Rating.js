const mongoose = require("mongoose");

const Rating = new mongoose.Schema({
    star:{
        type:Number,
        default:""
    },
    desc: {
        type: String,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Rating", Rating);