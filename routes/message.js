const express = require('express');
const router=express.Router();

const messagecontrollers=require('../controllers/message');
const userAuthentication=require('../middleware/auth');
const groupAuthentication=require('../middleware/gauth');
router.get('/get-messages',userAuthentication.authenticate,groupAuthentication.groupAuthenticate,messagecontrollers.getMessages)
router.post('/send-message',userAuthentication.authenticate,groupAuthentication.groupAuthenticate,messagecontrollers.postMessage);




 module.exports = router;