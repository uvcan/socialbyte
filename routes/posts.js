const express=require('express');
const router=express.Router();
const passport=require('passport');
const postController=require('../controllers/post_controller');

router.use('/create',passport.checkAuthenticatedUser,postController.create);


module.exports=router;