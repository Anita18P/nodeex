const express = require('express');

const messagecontrollers=require('../controllers/message');
const groupControllers=require('../controllers/GroupControllers');
const userAuthentication=require('../middleware/auth');
const groupauthentication=require('../middleware/gauth');
const router=express.Router();

router.post('/group-entry',userAuthentication.authenticate,groupControllers.groupEntry);
router.post('/createGroup',userAuthentication.authenticate,groupControllers.postGroup);
router.get('/get-groups',userAuthentication.authenticate,groupControllers.getGroup)



 module.exports = router;