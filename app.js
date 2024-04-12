const p1=require('path');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');

const app=express();
app.use(cors());

const adminRoutes = require('./routes/User');
app.use(bodyParser.json({ extended: false }));
app.use(express.static(p1.join(__dirname,'public')));
   console.log('before route');
 app.use(adminRoutes);
 console.log('after route');
sequelize.sync({force:false}).then(result=>{
    console.log(result);
console.log('sequel response');
    app.listen(3000,()=>{
        console.log("app listening at 3000");
        console.log("***********************");
    });
    console.log('after listeninng');

})
.catch(err=>{
    console.log(err);
    console.log('sequel error');
});