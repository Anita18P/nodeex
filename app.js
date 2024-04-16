const p1=require('path');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const User=require('./models/User');
const Expenses=require('./models/expense');
const order=require('./models/order');

const app=express();
app.use(cors());

const adminRoutes = require('./routes/User');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
app.use(bodyParser.json({ extended: false }));
app.use(express.static(p1.join(__dirname,'public')));
   console.log('before route');
 app.use(adminRoutes);
 app.use(expenseRoutes);
 app.use(purchaseRoutes);

 console.log('after route');
 
 User.hasMany(Expenses);
 Expenses.belongsTo(User);

 User.hasMany(order);
 order.belongsTo(User);



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