const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        
        // if(!user || user.password != req.user.password){
        //     return res.json(422,{
        //         message:'Invalid username / password'
        //     });
        // }
        if (!user  ) {
            return res.status(404).json({ error: 'User not found' });
          }
      
        // Check if user has the 'password' property before accessing it
        if (user.password ){ 
        const token = jwt.sign(user.toJSON(), 'secret', { expiresIn: 100000 });
        return res.json(200,{
            message:'You have signed in !!',
            data:token 
        })
    }
    }catch(err){
        console.log(err);
        return res.json(400,{
            message:'Internal server error'
        })
    }
}
