const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


passport.use(new GoogleStrategy({
    clientID: "849702427250-lkr542ec2q08glru9fkglhd7i9ghtkq0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
        try{
            const user=await User.findOne({ email: profile.emails[0].value})
            if(user){
                return done(null ,user);
            }else{
                const newUser=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null
                });
               
                return done(null,newUser);
            } 
        }catch(err){
            console.log('Error in crating the user using google-auth',err);
            return ;
        }
    }
));


module.exports=passport;