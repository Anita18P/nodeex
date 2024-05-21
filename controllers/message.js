const Message=require('../models/messages');
const chatUser=require('../models/users');
const Op=require('sequelize');

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
    messageData.dataValues.chatUser=req.user
    res.status(201).json({message:messageData});
}
exports.getMessages=async(req,res)=>{
   try{ const messages=await Message.findAll({
    include: [{
      model: chatUser
    }]
  });
    res.status(200).json({Messages:messages});
   }catch(error){
    console.log(error);
    res.status(500).json({error:error});
   }
}

