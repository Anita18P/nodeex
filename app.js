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
const Messages=require('./models/messages');
const Groups=require('./models/Group');
const Member=require('./models/member');
const Notifications = require('./models/notifications');
const adminRoutes=require('./routes/users');
const sendMessageRoutes=require('./routes/message');
const groupRoutes=require('./routes/GroupRoute');
const notifiRoutes=require('./routes/NotifiRoutes')


const app=express();
app.use(cors({
    origin:"http://127.0.0.1:5500",
    methods:['GET','POST'],
    credentials:true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(adminRoutes);
app.use(sendMessageRoutes);
app.use(groupRoutes);
app.use(notifiRoutes);
 app.use((req,res)=>{
    console.log("foll is urlss");
    console.log('url',req.url);
    res.sendFile(path.join(__dirname,`public/${req.url}`));
 })
User.hasMany(Messages);
Messages.belongsTo(User);
User.hasMany(Groups);
Groups.belongsTo(User);
User.hasMany(Groups);
Groups.hasMany(Messages);
Messages.belongsTo(Groups);
Groups.hasMany(Member);
Member.belongsTo(Groups);
User.hasMany(Member);
Member.belongsTo(User);
User.hasMany(Notifications);
Notifications.belongsTo(User);
Groups.hasMany(Notifications);
Notifications.belongsTo(Groups);




 
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