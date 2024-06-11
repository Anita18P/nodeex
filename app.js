const path=require('path');
//const fs=require('fs');
const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const http=require('http');

const socketIo=require('socket.io');
const server=http.createServer(app);
const io=socketIo(server);
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
const memberRoutes=require('./routes/memberRoutes');


app.use(cors({
    origin:"http://127.0.0.1:5500",
    methods:"*",
    credentials:true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
let onlineUsers=[];
io.on("connection", (socket) => {
    console.log("a user connected");
    console.log('id',socket.id);
    
   
    socket.on('addNewUser',(userId)=>{
        !onlineUsers.some((user)=>user.userId ===userId)&&
        socket.join(userId);
        onlineUsers.push({
            userId,
            socketId:socket.id
        });
        console.log("onlineUsers",onlineUsers);

    })
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  app.use((req, res, next) => {
    req.io = io;
    next();
  });
app.use(adminRoutes);
app.use(sendMessageRoutes);
app.use(groupRoutes);
app.use(notifiRoutes);
app.use(memberRoutes);

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
    server.listen(process.env.PORT ||3000,()=>{
        console.log("app listening at 3000");
        console.log("***********************");
    });

})
.catch((err)=>{
    console.log(err);
    console.log('sequel error');
});