const path=require('path');
const http=require('http');
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const adminRoutes=require('./routes/admin.js');
const shopRoutes=require('./routes/shop.js');
const contactRoutes=require('./routes/contact.js');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use('/admin',contactRoutes);
app.use('/admin/success',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','success.html'));
})
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})


app.listen(3000);