const passport=require('passport');
const User = require('../models/user');
const LocalStrategy=require('passport-local').Strategy;

//Authenticating using passport 
passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField: 'password',
        passReqToCallback:true
    },
    async function(req,email,password,done){
        try{
        //Find the user and stablish it's identity
        const user = await User.findOne({ email: email });
        
         if(!user || user.password != password){
                req.flash('error','Invalid username / password');
                return done(null , false);
            }

        return done(null ,user);

        }catch(err ){
            req.flash('error',err)
            console.log('Error in finding the user',err);
        }
    }
));


//Serialized user function 
passport.serializeUser(function(user , done){
    done(null,user.id);
});


//Deserialized User function 
passport.deserializeUser(async function(id,done){
    try {
        const user = await User.findById(id);
  
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }
  
        return done(null, user);
    } catch (err) {
        console.log('Error in finding the user --> Passport', err);
        return done(err);
    }
    
});


passport.checkAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //passing in the signed-in user to the res of locals so that it can be visibale to the template
         res.locals.user=req.user;      
    }
    next();
}

module.exports=passport;