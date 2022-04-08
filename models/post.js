const mongoose = require('mongoose');
// const crypto =require('crypto');

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    description:{
        type:String,
        max:500
    },
    image:{
        type:String
    },
    like:{
        type:Array,
        default:[]
    }

},{timestamps: true})

module.exports =mongoose.model('Post', postSchema);