const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    const posts= await Post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path:'comments',
            populate:{
                path:'user'
            }
         }).exec();
    return res.json(200,{
        message:"List of post",
        posts:posts
    });
}


module.exports.destroy=async function(req,res){
    try{
       
        const post=await Post.findById(req.params.id);
        if(post){
            if(post.user==req.params.id){
                 // Delete the post
                await post.deleteOne();
                 // Delete associated comments
                await Comment.deleteMany({ post: req.params.id });

            
                return res.json(200,{
                    message:"Post and associated comments deletad"
                });
            }else{
                
                return res.json(400,{
                    message:"Not autherized to delet the post"
                });
            } 
        } 
    }catch(err){
        console.log(err);
        return res.json(500,{
            
            message:"Internal Server error"
        });
    }
}