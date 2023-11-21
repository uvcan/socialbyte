const mongoose=require('mongoose');

const resetPasswordSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
        require:true
    },
    isValid:{
        type:Boolean,
        default:true
    }
    },{
    timestamps:true
});


const PasswordReset =mongoose.model('PasswordReset' ,resetPasswordSchema);
module.exports=PasswordReset;

