const path=require('path');
//const fs=require('fs');
const dotenv=require('dotenv');
dotenv.config();
//const https=require('https');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const User=require('./models/users');
const adminRoutes=require('./routes/users');

const app=express();
app.use(cors({
    origin:"http://127.0.0.1:5500",
    methods:['GET','POST'],
    credentials:true
}));



 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(adminRoutes);
//  app.use((req,res)=>{
//     console.log("foll is urlss");
//     console.log('url',req.url);
//     res.sendFile(path.join(__dirname,`public/${req.url}`));
//  })
 
sequelize.sync({force:false}).then((result)=>{
    // https.createServer({key:privateKey,cert:certificate},app)
    // .listen(process.env.PORT ||3000,()=>{
    //     console.log("app listening at 3000");
    //     console.log("***********************");
    // });
    app.listen(process.env.PORT ||3000,()=>{
        console.log("app listening at 3000");
        console.log("***********************");
    });

})
.catch((err)=>{
    console.log(err);
    console.log('sequel error');
});