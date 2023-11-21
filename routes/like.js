const express=require('express');
const router=express.Router();
const passport=require('passport');
const likesController=require('../controllers/like_controller');

router.post('/toggle',likesController.likeable);



module.exports=router;