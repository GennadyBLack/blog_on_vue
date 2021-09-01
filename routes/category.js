const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const Post = require('../models/post')
const jwt = require('jsonwebtoken');

router.get('/', async (req,res)=>{
const  allCategory = await Category.find().limit(10)
if(allCategory){res.json(allCategory).status(200)}
})

router.post('/',(req,res)=>{
    const newCategory = Category({name:req.body.name})
    newCategory.save()
    .then(category=>{
        res.status(200).json(category)
    }).catch(error=>res.json(error).status(500))
    })
    
    router.post('/:id',async (req,res)=>{
       await Category.findByIdAndUpdate(req.body.id,req.body)
        })



        
module.exports = router



// function authenticateToken(req, res, next) {
// const authHeader = req.headers['authorization'] const token = authHeader && authHeader.split(' ')[1] if (token == null) return res.sendStatus(401)
// jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
// console.log(err)
// if (err) return res.sendStatus(403)
// req.user = user
// next()
// })
// }