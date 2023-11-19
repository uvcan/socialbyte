const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{

        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        const populatedPost = await Post.findById(post._id).populate('user').exec();
        if (req.xhr){
            
            return res.status(200).json({
                data: {
                    post: populatedPost
                },
                message: "Post created!"
            });
        }


        req.flash('success','Post published');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}


module.exports.destroy=async function(req,res){
    try{
       
        const post=await Post.findById(req.params.id);
        if(post){
            if(post.user == req.user.id){
                 // Delete the post
                 await post.deleteOne();
                 // Delete associated comments
                await Comment.deleteMany({ post: req.params.id });

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:'Post delated'
                    });
                }


                req.flash('success','Post and associate comments deleted successfully!');
                return res.redirect('back');
            }else{
                req.flash('success','Not authorized to delete Post ');
                return res.redirect('back');
            }  
        }
        return res.redirect('back'); 
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}