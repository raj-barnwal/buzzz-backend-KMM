const express= require('express');
const router =express.Router();
const Post= require("../models/post");

//creating the post
router.post("/", async(req, res)=>{
    const newPost =new Post(req.body);
    try{
        const savePost= await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);

    }
})
//updating the post
router.put("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId=== req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("post updated")
        }else{
            res.status(403).json("you can only update your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//deleting the post
router.delete("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId=== req.body.userId){
            await post.deleteOne();
            res.status(200).json("post delted")
        }else{
            res.status(403).json("you can only delete your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//liking and disliking the post
router.put("/:id/like", async(req, res)=>{
    try{
        const post =await Post.findById(req.params.id);
        if(!post.like.includes(req.body.userId)){
            await post.updateOne({$push:{like: req.body.userId}});
            res.status(200).json("The post is liked")
        }else{
            await post.updateOne({$pull:{like:req.body.userId}});
            res.status(200).json("The post is disliked")
        }

    }catch(err){
        res.status(500).json(err);
    }
})
//get a post
router.get("/:id", async(req, res)=>{
    try{
        const post =Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})
//get all post
router.get("/timeline", async(req, res)=>{
      
})


module.exports= router;