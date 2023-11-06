const Post = require("../models/post");
const User=require('../models/user');
module.exports.home=async function(req,res){
    try{
         const posts= await Post.find({}).populate('user').exec();
        {
            return res.render('home', {
                title: "Social Byte | Home",
                posts:  posts
            });
        }
    }catch(err){
        console.log('Erroe in showing a post',err);
    }
    
    
}