const express = require('express');
const bookApps = require('../models/apdetails');
const router=express.Router();
const admincontrollers=require('../controllers/adminc');

router.get('/',admincontrollers.getPage);

router.get('/get-user',admincontrollers.getDetails);

router.post('/add-user',admincontrollers.postDetails);

router.delete('/delete/:id',admincontrollers.deleteDetails);

module.exports = router;

