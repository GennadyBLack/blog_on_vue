const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Category = require('../models/category')

router.get('/', async (req,res)=>{
   // pagination query
    var page = parseInt(req.query.page) -1 
    ; //for next page pass 1 here
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
    
    // var page = parseInt(req.query.page) -1 || 1; //for next page pass 1 here
    // var limit = parseInt(req.query.limit) || 10;
  
  
      // // const idCategory = await Category.findOne({name:req.query.tag})
      //  const query = {}// {category:idCategory._id}
      //  Post.paginate(query, {limit:10}, function (err, result) {
      //    if(err){
      //      res.json(err).status(400)
      //    } 
      //    // result.docs
      //   // result.totalDocs = 100
      //   // result.limit = 10
      //   // result.page = 1
      //   // result.totalPages = 10
      //   // result.hasNextPage = true
      //   // result.nextPage = 2
      //   // result.hasPrevPage = false
      //   // result.prevPage = null
      //   // result.pagingCounter = 1
         
      //    return res.json({
      //     total: result.totalDocs,
      //     page: result.page,
      //     pageSize: docs.length,
      //     articles: docs
      //   }
      //    )
      // });
})

router.post('/',(req,res)=>{
    const newPost = Post({
      title:req.body.articleInput.title,
      author:req.body.articleInput.author,
      description:req.body.articleInput.description,
      genre:req.body.articleInput.genre,
      image:req.body.articleInput.image,
      category:req.body.articleInput.category,
      slug:req.body.articleInput.slug
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
     Post.paginate(query, {limit:10}, function (err, result) {
       if(error){
         res.json(error).status(400)
       } 
       // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      // result.pagingCounter = 1
       
       return res.json({
        total: result.totalDocs,
        page: result.page,
        pageSize: docs.length,
        articles: docs
      }
       )
    });
  })
  router.get('/:id',async(req,res)=>{
    const item =  await Post.findById(req.params.id).populate('category')
    if(item){
      res.json(item).status(200)
    } else {
      res.json('not found').status(400)
    }
  })
  
module.exports = router

