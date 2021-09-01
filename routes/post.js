const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Category = require('../models/category')

router.get('/', async (req,res)=>{
    //pagination query
    var page = parseInt(req.query.page) -1 || 1; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 10;
    var query = {};

    Post.find(query)
    .sort({ date: -1 })
    .skip(page * limit) //Notice here
    .limit(limit)
    .exec((err, doc) => {
      if (err) {
        return res.json(err);
      }
      Post.estimatedDocumentCount(query).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        return res.json({
          total: count,
          page: page,
          pageSize: doc.length,
          articles: doc
        });
      });
    });


})

router.post('/',(req,res)=>{
    const newPost = Post({
      title:req.body.title,
      author:req.body.author,
      desription:req.body.desription,
      genre:req.body.genre,
      image:req.body.image,
      category:req.body.category
    })
    newPost.save()
    .then(post=>{
        res.status(200).json(post)
    }).catch(error=>res.json(error).status(500))
    })
    
    router.post('/:id',async (req,res)=>{
       await Post.findByIdAndUpdate(req.body.id,req.body)
        })
        

                //view all Post in category
 router.get('/tag', async (req,res)=>{
  var page = parseInt(req.query.page) -1 || 1; //for next page pass 1 here
  var limit = parseInt(req.query.limit) || 10;


     const idCategory = await Category.findOne({name:req.query.tag})
     const query = {category:idCategory._id}

     const postInCategory = await Post.find(query)
     .sort({ date: -1 })
     .skip(page * limit) //Notice here
     .limit(limit).exec(err,doc=>{if(err){res.json(err)}})
     const  count = await Post.find({category:idCategory._id})
    //const page = Match.ceil(count / limit)
      if(postInCtegory){res.json({
          total: count,
          page: page,
          pageSize: postInCtegory.length,
          articles: postInCategory
          }).status(200)}
                   })
                  


module.exports = router

