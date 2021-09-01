const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
//Routers
const authRoute = require('./routes/auth')
const CategoryRoute = require('./routes/category')
const PostRoute = require('./routes/post')
const ProfileRoute = require('./routes/profile')

//Routes
app.use(express.json())
app.use('/auth',cors(),authRoute)
app.use('/category',cors(),CategoryRoute)
app.use('/articles',cors(),PostRoute)
app.use('/profile',cors(),ProfileRoute)


mongoose.connect("mongodb://localhost:27017/auth_ex", { useCreateIndex: true,useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(2400, function(){
        console.log("Сервер ожидает подключения...");
    });
});