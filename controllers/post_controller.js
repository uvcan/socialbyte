const Post=require('../models/post');
module.exports.create=async function(req,res){
    try{
        console.log(req.post);
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back');
    }catch(err){
        console.log('Error in creating a post',err);
    }
}