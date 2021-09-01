const mongoose = require('mongoose'),
Schema = mongoose.Schema

const Profile = Schema({
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    genre:String,
    name:String,
    alias:{
        type:String,
        min:8
    },
    description:{
        type:String,
        min:40
    },
    bio:String,
    image_url:String,
    date_of_birth:{type:Date}
})

module.exports = mongoose.model('Profile',Profile)