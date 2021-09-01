const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')

const tokenSecret = "my-token-secret"

const middleware = require('../middlewares')

router.post('/login', (req, res) => {
    console.log(req.body,'login')
    const {email,password} = req.body.user
    User.findOne({email: email})
    .then(user => {
        if(!user) res.status(404).json({errors: 'no user with that email found'})
        else {
            bcrypt.compare(password, user.password, (errors, match) => {
                if (errors) res.status(500).json(errors)
                else if (match) res.status(200).json({token: generateToken(user),user:user})
                else res.status(403).json({errors: 'passwords do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/signup', (req, res) => {
    const {login,password,email} = req.body.user
    bcrypt.hash(password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
    
            const newUser =  User({email: email, password: hash,login:login})
            newUser.save()
                .then(user => {
                    res.status(200).json({token: generateToken(user),user:user})
                })
                .catch(errors => {
                    res.status(500).json(errors)
                })
        }
    })
});

router.get('/jwt-test', middleware.verify , (req, res) => {
    res.status(200).json({user:req.user})
})

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

module.exports = router