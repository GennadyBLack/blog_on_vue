const { text } = require('express')

const mongoose = require('mongoose'),
Schema = mongoose.Schema

const Comment = Schema({
text:{
    type:text,
    required:true
},
user:{type:Schema.Types.ObjectId,ref:'User'},
date:{
    type:Date,
    required:true,
    default: Date.now
}

})

modeules.export = mongoose.model('Comment',Comment)