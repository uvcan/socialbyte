const User = require("../models/user");

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    });
}

module.exports.signIn=function(req ,res){
    return res.render('user_sign_in',{
        title:'Sign-In'
    });
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Sign-Up'
    })
}


module.exports.create=async function(req ,res){
    try{
    //Checking password and confirm password are matching or not 
    if(req.body.password != req.body.Confirm_password){
        return res.redirect('back');
    }
    //Finding the user in the db
    const user=await User.findOne({ email:req.body.email });

    //creating the user if the user is already not present in the db
    if(!user){
        User.create(req.body);
        return res.redirect('/users/sign-in');
    }
    console.log('user already present ');
    return res.redirect('back');

    }catch(err){
        if(err){
            console.log('Error in Sign-up the user ', err);
        }
    }
}

module.exports.createSession=function(req,res){
    //To Do later
}