const router =require("express").Router();
const User= require("../models/user");
const bcrypt = require("bcrypt")
const passport = require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const mongoose= require("mongoose");

// const CLIENT_URL="http://localhost:3000"
// const clientID="638608782844-7d2j4afbothujo3b530kj6aomhuebikl.apps.googleusercontent.com"
// const clientSecret="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"

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID,
//         clientSecret,
//         callbackURL: `http://localhost:5000/auth/google/callback`,
//       },
//       (accessToken, refreshToken, profile, done) => {
//         // find if a user exist with this email or not
//         User.findOne({email:profile.emails[0].value}).then((data)=>{
//             if(data){
//                 return done(null,data);
//             }
//             else{
//                 User({
//                     name: profile.name.familyName,
//                     // lastname: profile.lastname,
//                     email: profile.emails[0].value,
//                     googleId: profile.id,
//                     password: null,
//                     provider: 'google',
//                     isVerified: true,
                   
//                 }).save(function(err,data){
//                     return done(null,data)
//                 })
//             }
//         })
    
//       }
//     )
//   );

//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function(err, user){
//         done(err, user)
//     })
//     done(null, user.id)
//   });




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

//google login system
// router.get("/login/success", (req, res) => {
//     if (req.user) {
//         res.send({success: true,
//         user: req.user});
//     }else{
//         res.send({success:false});
//     }
//   // console.log(mongoose.Types.ObjectId.isValid('108491538370921546617'));
// });
// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         success: false,
//         message: "failure",
//     });
// });

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(CLIENT_URL);
// });

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         successRedirect: CLIENT_URL,
//         failureRedirect: "/login/success",
//     })
// );

module.exports = router