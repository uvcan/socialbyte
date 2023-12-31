const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile/:id',passport.checkAuthenticatedUser,userController.profile);
// router.get('/resetPassword/:id',passport.checkAuthenticatedUser,userController.resetPassword);
router.post('/update/:id',passport.checkAuthenticatedUser,userController.update);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);

//Middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);
router.get('/sign-out',userController.destroy);


router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/users/sign-in' }),userController.createSession);

module.exports=router;