const http=require('http');
const express=require('express');
const app=express();
app.use((req,res,next)=>{
      console.log('In a Middleware');
      next();
})
app.use((req,res,next)=>{
    console.log('In a Middleware2');
    res.send( {key1:'value'} );
})
app.listen(3000);