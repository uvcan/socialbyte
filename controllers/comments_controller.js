const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
        const post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            });
            post.comments.push(comment);
            await post.save();
            req.flash('success','Comments published !');
            return res.redirect('/');
            }
        return res.redirect('/');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}


module.exports.destroy=async function(req, res){
    try{
        const comment=await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId=comment.post;
            await comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params._id}});
            req.flash('success','Comments deleted successfully !');
            return res.redirect('back');
        }else{
            req.flash('success','U are not aothorized to  deleted Comments !');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
        
    }
}