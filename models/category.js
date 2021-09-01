const mongoose = require('mongoose'),
Schema = mongoose.Schema

const Category = Schema({
    name:{
        type:String,
        required:true,
        min:2,
        unique : true
    }
})

module.exports = mongoose.model('Category',Category)