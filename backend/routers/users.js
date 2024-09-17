const express=require('express')

const auth=require('../middleware/auth')
const {registerUser,loginUser,getUserProfile,logoutUser,logoutUserFromAllSessions}=require('../controllers/usersControllers')
const router=new express.Router();

router.post('/',registerUser);

router.post('/login',loginUser);

router.get('/me',auth,getUserProfile);

router.post('/logout',auth,logoutUser);


module.exports=router;