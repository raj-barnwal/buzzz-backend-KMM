const mongoose = require('mongoose');
// const crypto =require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 30
    },
    email:{
        type: String,
        required: true,
        unique: true,
        
    },
    password:{
        type: String,
        required: true,
        min:8,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        max:150
    },
    city:{
        type:String,
        max: 20
    },
    hometown:{
        type: String,
        max:20
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }

},{timestamps: true})

module.exports =mongoose.model('User', userSchema);