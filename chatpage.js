const express=require('express');
const router=express.Router();
const fs=require('fs');
 router.get('/',(req,res,next)=>{
    fs.readFile('username.txt',(err,data)=>{
       if(err){
        console.log(err);
        data="NO chat Exist";
       }
       res.send(`
    ${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username') "
    action="/" method="POST">
    <input type="text" name="message" placeholder="Type a Message">
    <input type="hidden" name="username" id="username">
    <button type="submit" >Send</button>
    </form>`);
    }
    )
    
 })

 router.post('/',(req,res,next)=>{
    console.log(req.body);
     fs.appendFile("username.txt",`${req.body.username}:${req.body.message}`,(err)=>
     err?console.log(err):res.redirect('/')
     )
     
   
 })
 module.exports=router;