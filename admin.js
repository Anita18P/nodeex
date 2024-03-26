const express = require('express');
const bookApps = require('../models/blogDetails');
const router=express.Router();
const admincontrollers=require('../controllers/adminc');

//router.get('/get-blog',admincontrollers.getBlogDetails);

router.post('/add-blog',admincontrollers.postBlogDetails);

//router.delete('/delete/:id',admincontrollers.deleteComment);

module.exports = router;
