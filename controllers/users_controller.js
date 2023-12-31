const User = require("../models/user");
const fs=require('fs');
const path=require('path');

module.exports.profile=async function(req,res){
    const user= await User.findById(req.params.id);
    return res.render('user_profile',{
        title:'User Profile',
        profile_user:user
    });
}

module.exports.update=async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
            if(err){console.log('Multer error',err);}
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if (fs.existsSync()){
                        fs.unlinkSync(path.join(__dirname ,'..',user.avatar));
                    }else{
                    user.avatar=User.avatarPath +'/'+req.file.filename;
                    user.save();
                    }
                }
                
                req.flash('success','Profile updated sucessfully!');
                return res.redirect('back');
        });
       
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        
    }else{
        return res.status(404).send('Unauthorized');
    }    
}

module.exports.signIn=function(req ,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Sign-In'
    });
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Sign-Up'
    })
}


module.exports.create=async function(req ,res){
    try{
    //Checking password and confirm password are matching or not 
    if(req.body.password != req.body.Confirm_password){
        req.flash('success','Password and confirm password not same!');
        return res.redirect('back');
    }
    //Finding the user in the db
    const user=await User.findOne({ email:req.body.email });

    //creating the user if the user is already not present in the db
    if(!user){
        User.create(req.body);
        req.flash('success','Sign Up successfully !');
        return res.redirect('/users/sign-in');
    }
    req.flash('success','Email already used !');
    return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        console.log('Error in Sign-up the user ', err);
    }
}

module.exports.createSession=function(req,res){
    req.flash('success','Logged in successfully !');
    return res.redirect('/');

}

module.exports.destroy=function(req ,res){
    
    req.logout((err) => {
        if (err) {
          return res.status(500).json({ error: 'Logout failed' });
        }
    });
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}