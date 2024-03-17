const express=require('express');
const router=express.Router();
const fs=require('fs');
 router.get("/login",(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" id="username" placeholder="Username" name="username"><button type="submit" placeholder="Username">Login</button></form>')
 })

 router.post("/login",(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
 })
 module.exports=router;
