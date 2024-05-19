const Message=require('../models/messages');
exports.postMessage=async(req,res)=>{
    console.log('in post message function');
    console.log(req.user);
    const userData=req.user;
    console.log('req.body');
    console.log(req.body);
    console.log('userData');
    console.log(userData);
    const messageData= await Message.create({
        Messages:req.body.message,
        chatUserId:req.user.id
    })
    res.status(201).json({user:userData,message:messageData});
}
