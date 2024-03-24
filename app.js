const express=require('express');
const path1=require('path');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const cors=require('cors');
const app=express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path1.join(__dirname,'/public')));
   console.log('before route');
 app.use('/admin',adminRoutes);
 console.log('after route');
sequelize.sync().then(result=>{
    console.log(result);
console.log('sequel response');
    app.listen(3000);
    console.log('after listeninng');

})
.catch(err=>{
    console.log(err);
    console.log('sequel error');
});

