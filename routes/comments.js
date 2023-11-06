const express=require('express');
const router=express.Router();
const passport=require('passport');
const commenstController=require('../controllers/comments_controller');


router.use('/create',passport.checkAuthenticatedUser,commenstController.create);


module.exports=router;