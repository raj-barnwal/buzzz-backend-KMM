const express= require('express');
const router =express.Router();
const bcrypt = require("bcrypt");
const User= require("../models/user");

//updating user

router.put("/:id", async(req, res)=>{
    if(req.body.userId=== req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt= await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user =await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("Account updated")
        }catch(err){
            return res.status(500).json(err);
        }

    }else {
        return res.status(403).json("it's not your account");
    }
})
//delete the user
router.delete("/:id", async(req, res)=>{
    if(req.body.userId=== req.params.id || req.body.isAdmin){
  
        try{
            const user =await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        }catch(err){
            return res.status(500).json(err);
        }

    }else {
        return res.status(403).json("you can only delete ur account");
    }
})
//get a user

router.get("/:id", async (req, res)=>{
    try{
        const user=await User.findById(req.params.id);
        const { password, updatedAt, ...other}=user._doc;
        res.status(200).json(other )

    }catch(err){
        res.status(500).json(err)
    }
})
//follow user

//unfollow user

module.exports = router