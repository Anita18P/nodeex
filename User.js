const express = require('express');
const attendance= require('../models/User');
const router=express.Router();
const admincontrollers=require('../controllers/user');

 router.post('/sign-up',admincontrollers.postUserDetails);
 router.post('/user-login',admincontrollers.userLogin);


 module.exports = router;