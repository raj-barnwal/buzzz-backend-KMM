// const User = require("../models/user");
// const jwt = require('jsonwebtoken');
// const expressJWT = require("express-jwt")
// const {OAuth2Client}= require('google-auth-library');
// const UserInfoError = require('passport-google-oauth20/lib/errors/userinfoerror');
// const user = require("../models/user");

// const client =new OAuth2Client("638608782844-t78b8msaagb9mchnei8ik1ommgl9d932.apps.googleusercontent.com")

// //creating user 
// exports.signup =(req, res)=>{
//     console.log(req.body);
//     const{name, email, password}= req.body;
//     User.findOne({email}.exec((err, user)=>{
//         if(user){
//             return res.status(400).json({error:"already there's a user"})
//         }
//         let newUser= new User({name, email, password});
//         newUser.save((failure, success)=>{
//             if(failure){
//                 console.log(`error occurred:${failure}`);
//                 return res.status(400),json({error:failure})
//             }
//             res.json({
//                 message: "Successfully signed in!"
//             })
//         })
//     }))
// }


// exports.googlelogin = (req,res)=>{
//     const {tokenId}=req.body;
//     client.verifyIdToken({idToken:tokenId,audience:"638608782844-t78b8msaagb9mchnei8ik1ommgl9d932.apps.googleusercontent.com"}).then(response=>{
//         const{email_verfied, name, email}=response.payload;
//         if(email_verfied){
//             User.findOne({email}).exec((err, user)=>{
//                 if(err){
//                     return res.status(400).json({
//                         error: "Something went wrong"
//                     })
//                 }else{
//                     if(user){
//                         const token =jwt.sign({_id : user._id}, process.env.JWT_SIGNIN_KEY,{ expiresIn:'5d'});
//                         const {_id, name, email}=user;

//                         res.json({
//                             token,
//                             user:{_id, name, email}
//                         })
//                     }else{
//                             let password = email+process.env.JWT_SIGNIN_KEY;
//                             let newUser1 = new User({name, email,password});
//                             newUser1.save((err, data)=>{
//                                 if(err){
//                                     return res.status(400).json({
//                                         error:"something went wrong"
//                                     })
//                                 }
//                                 const token =jwt.sign({_id : data._id}, process.env.JWT_SIGNIN_KEY,{ expiresIn:'5d'});
//                                 const {_id, name, email}=newUser1;

//                             res.json({
//                                 token,
//                                 user:{_id, name, email}
//                             })
//                          })
//                         }
//                         } 
                    
//             })
//         }

//       console.log(response.payload);
//     })
// }