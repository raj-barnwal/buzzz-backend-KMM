const express= require('express');
const User= require("../models/user")
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
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})
//get all post or feed
// router.get("/feed/all", async(req, res)=>{
//     try{
//         const loggedinUser= await User.findById(req.body.userId);
//         const userPosts = await Post.find({userId: loggedinUser._id});
//         const friendPosts = await Promise.all(
//             loggedinUser.following.map(friendId=>{
//                 return Post.find({userId: friendId});
//             })
//         );
//         res.status(200).json(userPosts.concat(...friendPosts))

//     }catch(err){
//         res.status(500).json(err);
//     }
      
// })
router.get("/feed/:id", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.id);
      console.log(currentUser);
      const userPosts = await Post.find({ userId: currentUser._id });
    //   const friendPosts = await Promise.all(
    //     currentUser.followings.map((friendId) => {
    //       return Post.find({ userId: friendId });
    //     })
    //   ); .concat(...friendPosts)
      res.json(userPosts)
    } catch (err) {
      res.status(500).json(err);
    }
  });

  


module.exports= router;