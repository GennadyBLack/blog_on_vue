const mongoose = require('mongoose')

const User = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true,
        unique : true
    },
    role:{
        type:Number,
        required: true,
        default:3
    }
})

module.exports = new mongoose.model("User",User)