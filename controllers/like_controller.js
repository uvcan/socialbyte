const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');


module.exports.likeable=async function(req ,res){
    try{
        //likes/toggle/?id=xyzz & type=Post

        let likeable;
        let delated=false;
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }else{
            likeable=await Comment.findById(req.query.id).populate('like');
        }

        //check if the already exists
        let existingLike=await Like.findOne({
            likeable:req.query.id,
            onModal:req.query.type,
            user:req.user._id
        });

        //if the like exists we remove the like
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            
            existingLike.remove();
            delated=true;
        }else{
             //if the like dose not exit we create the like
             let newLike=await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModal:req.query.type
             });

             likeable.likes.push(newLike._id);
             likeable.save();
        }

       return res.json(200,{
            data:{
                delated:delated
            },
            message:"Request successful"
       });
        



    }catch(err){
        return res.statu(500).json({
            message:'Internal server Error'
        });
    }
}