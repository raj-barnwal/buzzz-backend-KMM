const router =require("express").Router();
const User= require("../models/user");
const bcrypt = require("bcrypt")

//register
router.post("/register", async (req,res)=>{
    
   
    try{
        //encoding password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash (req.body.password, salt);
        //creating user
        const newUser =  new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            
        });
        //saving the user
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        console.log(err);

    }
  
})

// login 
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword= await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(400).json("invalid password")

        res.status(200).json(user)
    }catch(err){
        console.log(err);
    }
})

module.exports = router