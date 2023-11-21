const Post = require("../models/post");
const User=require('../models/user');
module.exports.home=async function(req,res){
    try{
         const posts= await Post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate:{
                path:'likes'
            }
         }).populate('likes').exec();
        const all_users=await User.find({});
        {
            return res.render('home', {
                title: " Home",
                posts:  posts,
                all_users:all_users
            });
        }
    }catch(err){
        console.log('Error in showing the home page',err);
    }
}