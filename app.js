const path=require('path');
const fs=require('fs');
const dotenv=require('dotenv');
dotenv.config();
const https=require('https');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const User=require('./models/User');
const Expenses=require('./models/expense');
const order=require('./models/order');
const Forgotpassword=require('./models/forgotpassword');
const FilesDownloaded=require('./models/filesDownloaded');
const helmet=require('helmet');
const compression=require('compression');
var morgan=require('morgan');


const app=express();
app.use(cors());

const adminRoutes = require('./routes/User');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
const premiumRoutes=require('./routes/premiumFeatures');
const passwordRoutes=require('./routes/forgotPassword');
// const privateKey=fs.readFileSync('server.key');
// const certificate=fs.readFileSync('server.cert');

var accessLogstream=fs.createWriteStream(path.join(__dirname,'access.log'),
 {flags:'a'}
);
 app.use(helmet());
 app.use(compression());
 app.use(morgan('combined',{stream:accessLogstream}));
 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
   console.log('before route');
 app.use(adminRoutes);
 app.use(expenseRoutes);
 app.use(purchaseRoutes);
 app.use(premiumRoutes);
 app.use(passwordRoutes);
 

 
 User.hasMany(Expenses);
 Expenses.belongsTo(User);

 User.hasMany(order);
 order.belongsTo(User);
 
 User.hasMany(Forgotpassword);
 Forgotpassword.belongsTo(User);
 
 User.hasMany(FilesDownloaded);
 FilesDownloaded.belongsTo(User);


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
