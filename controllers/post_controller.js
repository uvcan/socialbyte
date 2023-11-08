const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{

        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back');
    }catch(err){
        console.log('Error in creating a post',err);
    }
}


module.exports.destroy=async function(req,res){
    try{
        // const post= await Post.findById( req.params.id);
        const post=await Post.findById(req.params.id);
        if(post){
            if(post.user == req.user.id){
                 // Delete the post
                 await post.deleteOne();
                 // Delete associated comments
                await Comment.deleteMany({ post: req.params.id });
                return res.redirect('back');
            }else{
                return res.redirect('back');
            }  
        }
        return res.redirect('back'); 
    }catch(err){
        console.log('Erroer in delating the post',err);
    }
}