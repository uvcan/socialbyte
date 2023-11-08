const express=require('express');
const router=express.Router();
const passport=require('passport');
const commenstController=require('../controllers/comments_controller');


router.post('/create',passport.checkAuthenticatedUser,commenstController.create);
router.get('/destroy/:id',passport.checkAuthenticatedUser,commenstController.destroy);

module.exports=router;