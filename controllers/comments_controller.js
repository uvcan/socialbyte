const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
        const post = await Post.findById(req.body.post);
        console.log(req.post);
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
    }catch(err){
        console.log('Error in creating comments',err);
    }
}