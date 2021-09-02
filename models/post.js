const mongoose = require('mongoose'),
Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');

const Post = Schema({
title:{
    type:String,
    required:true,
    min:8},
author: {type:Schema.Types.ObjectId,ref:'Profile',required:true},
desription:{type:String,
            min:120,
        required:true},
image:String,
date:{
    type:Date,
    required:true,
    default: Date.now
},
genre: [{type: Schema.ObjectId, ref: 'Genre'}],
comment: [{type: Schema.ObjectId, ref: 'Comment'}],
category:[{type:Schema.Types.ObjectId,ref:'Category'}]
}

)
Post.plugin(mongoosePaginate);


module.exports = mongoose.model('Post',Post)