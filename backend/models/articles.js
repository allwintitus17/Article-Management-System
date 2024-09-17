const mongoose=require('mongoose');
const User=require('./user')

const articleSchema=mongoose.Schema({
        user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'  //reference Who Created the inventery
    },
    Name:{
       type:String,
       required:true, 
    },
    Description:{
        type:String,
        required:[true,'Please Enter the Description of the Article']
    },Author:{
            type:String,
            required:true
    }


},{
    timestamps:true,
})

const Article=mongoose.model('Article',articleSchema);
module.exports=Article;