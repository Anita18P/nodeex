const express = require('express');

const messagecontrollers=require('../controllers/message');
const userAuthentication=require('../middleware/auth');
const router=express.Router();

router.get('/get-messages',userAuthentication.authenticate,messagecontrollers.getMessages)
router.post('/send-message',userAuthentication.authenticate,messagecontrollers.postMessage);




 module.exports = router;