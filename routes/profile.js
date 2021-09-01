const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
// const jwt = require('jsonwebtoken');

// router.get('/', async (req,res)=>{
// const  allCategory = await Category.find()
// if(allCategory){res.json(allCategory).status(200)}

// })

router.get('/:id', async (req,res)=>{
    console.log('ID',req.params)
const  searchProfile = await Profile.findById({_id:req.params.id})
console.log(searchProfile,'Profile')
if(searchProfile){res.json(searchProfile).status(200)}

})

router.post('/',(req,res)=>{
    const newProfile = Profile({
        name:req.body.name,
        user:req.body.user,
        genre:req.body.genre,
        alias:req.body.alias,
        description:req.body.description,
        bio:req.body.bio,
        image_url:req.body.image_url,
        date_of_birth:req.body.date_of_birth
    })


    newProfile.save()
    .then(profile=>{
        res.status(200).json(profile)
    }).catch(error=>res.json(error).status(500))
    })
    
    router.post('/:id',async (req,res)=>{
       await Profile.findByIdAndUpdate(req.body.id,req.body)
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