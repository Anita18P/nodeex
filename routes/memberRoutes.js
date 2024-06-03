const express = require('express');

const userAuthentication=require('../middleware/auth');
const groupauthentication=require('../middleware/gauth');
const memberController=require('../controllers/memberControllers');
const router=express.Router();

router.delete('/remove-member',userAuthentication.authenticate,groupauthentication.groupAuthenticate,memberController.removeMembers);
router.get('/get-members',userAuthentication.authenticate,groupauthentication.groupAuthenticate,memberController.getMembers);
router.put('/make-admin',userAuthentication.authenticate,groupauthentication.groupAuthenticate,memberController.makeAdmin);


 module.exports = router;