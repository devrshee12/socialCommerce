const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    number: {
        type: String,
        default: ""
    },
    role:{
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("User", User);