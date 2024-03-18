const path=require('path');
const express=require('express');
const rootDir=require('../util/path');
const router=express.Router();
//get request
router.get('/contact-us',(req,res,next)=>{
    console.log('hello contact us');
     res.sendFile(path.join(rootDir,'views','contactus.html'));
    
})
//post request
router.post('/contact-us',(req,res,next)=>{
   res.redirect('admin/success');
 
})


module.exports=router;