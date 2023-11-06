const Post = require("../models/post");
const Comment=require('../models/comment');
module.exports.home=async function(req,res){
    try{
         const posts= await Post.find({})
         .populate('user')
         .populate({
            path:'comments',
            populate:{
                path:'user'
            }
         });
        //  const comments=await Comment.find({});
        {
            return res.render('home', {
                title: "Social Byte | Home",
                posts:  posts,
            
            });
        }
    }catch(err){
        console.log('Erroe in showing a post',err);
    }
}