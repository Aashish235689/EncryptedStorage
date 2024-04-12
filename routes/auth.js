const express=require('express');
const router=express.Router();
const {login,register,getUsers,getImage,updateUser}=require('../controllers/auth');
const {uploadUserImage}=require('../controllers/uploads')
const authenticateUser=require('../middleware/authentication')
router.post('/upload',uploadUserImage);

router.post('/register',register);
router.post('/login',login);
router.get('/',getUsers);
router.get('/image/:imageName',authenticateUser,getImage);
router.post('/upload',authenticateUser,uploadUserImage)
router.put('/update',authenticateUser,updateUser)
module.exports=router;