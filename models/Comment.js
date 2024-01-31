const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
    comment:{
        type:String,
        default:""
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

module.exports = mongoose.model("Comment", Comment);