const express = require('express');

const notifcontrollers=require('../controllers/notifControllers');
const userAuthentication=require('../middleware/auth');
const router=express.Router();

router.get('/get-notifications',userAuthentication.authenticate,notifcontrollers.getNotifications);
router.post('/join-group',userAuthentication.authenticate,notifcontrollers.joingroup);




 module.exports = router;