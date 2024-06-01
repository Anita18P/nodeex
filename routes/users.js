const express = require('express');

const admincontrollers=require('../controllers/user');
const userAuthentication=require('../middleware/auth');
const groupAuthentication=require('../middleware/gauth');
const router=express.Router();
router.get('/get-user/:PhoneNumber',userAuthentication.authenticate,groupAuthentication.groupAuthenticate,admincontrollers.getUser);
router.post('/user-login',admincontrollers.userLogin);
router.post('/sign-up',admincontrollers.postUserDetails);




 module.exports = router;