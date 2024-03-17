const express=require('express');
const router=express.Router();
//get request
router.get('/',(req,res,next)=>{
    res.send('<h1>Hello from node Express</h1>');
  
})


module.exports=router;