const User = require("../models/user");

module.exports.profile=async function(req,res){
    const user= await User.findById(req.params.id);
    return res.render('user_profile',{
        title:'User Profile',
        profile_user:user
    });
}

module.exports.update=async function(req,res){
    if(req.user.id == req.params.id){
        let user=await User.findByIdAndUpdate(req.params.id ,req.body);
        console.log(user);
        return res.redirect('back');
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
        return res.redirect('back');
    }
    //Finding the user in the db
    const user=await User.findOne({ email:req.body.email });

    //creating the user if the user is already not present in the db
    if(!user){
        User.create(req.body);
        return res.redirect('/users/sign-in');
    }
    
    return res.redirect('back');

    }catch(err){
        console.log('Error in Sign-up the user ', err);
    }
}

module.exports.createSession=function(req,res){
   
    return res.redirect('/');

}

module.exports.destroy=function(req ,res){
    req.session.destroy();
    return res.redirect('/');
}