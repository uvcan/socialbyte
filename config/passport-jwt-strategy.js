const passport=require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        const user=User.findOne({id: jwt_payload.sub});
    
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            
        }
    }catch(err){
        return done(err ,false);
    }   
}));



module.exports=passport;