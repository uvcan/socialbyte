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
            return res.redirect('/');
            }
        return res.redirect('/');
    }catch(err){
        console.log('Error in creating comments',err);
        return res.redirect('/back');
    }
}


module.exports.destroy=async function(req, res){
    try{
        const comment=await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId=comment.post;
            await comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params._id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in deleating Comment', err);
        return res.redirect('back');
    }
}