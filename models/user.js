const mongoose = require('mongoose');
// const crypto =require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
      
    },
    email:{
        type: String,
       
        
    },
    password:{
        type: String,
      
    },
    profilePicture:{
        type:String,
        
    },
    coverPicture:{
        type:String,
        
    },
    followers:{
        type:Array,
       
    },
    following:{
        type:Array,
       
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        
    },
    city:{
        type:String,
       
    },
    hometown:{
        type: String,
       
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }

},{timestamps: true})

module.exports =mongoose.model('User', userSchema);