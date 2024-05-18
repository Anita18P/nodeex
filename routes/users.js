const express = require('express');

const admincontrollers=require('../controllers/user');
// const userAuthentication=require('../middleware/auth');
const router=express.Router();
router.post('/user-login',admincontrollers.userLogin);
router.post('/sign-up',admincontrollers.postUserDetails);




 module.exports = router;