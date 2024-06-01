const Message=require('../models/messages');
const chatUser=require('../models/users');
const Sequelize=require('sequelize');
const Group=require('../models/Group')
const Member=require('../models/member');

exports.postMessage=async(req,res)=>{
    console.log('in post message function');
    console.log(req.user);
    const userData=req.user;
    console.log('req.body');
    console.log(req.body);
    console.log('userData');
    console.log(userData);
    console.log('req.group');
    console.log(req.group);
    const messageData= await Message.create({
        Messages:req.body.message,
        GroupId:req.group.id,
        chatUserId:req.user.id,
       
    })
    
    messageData.dataValues.chatUser=req.user
    res.status(201).json({message:messageData});
}
exports.getMessages=async(req,res)=>{
//   try{console.log('in get messages controller');
//   console.log('req.group');
//   console.log(req.group);
//   const groupData=req.group;
//   const {messageId}=req.query;
//   console.log(req.query);
//   console.log('messageId');
//   console.log(messageId);
//   if(messageId){
//   const messages=await Message.findAll({
//     where:{
//       GroupId:req.group.id
//     },
//     include:{
//       model:chatUser,
      
//     }
//   });
//   console.log(messages);
//   res.status(200).json({Messages:messages,groupData});

//   }catch(error){
//     console.log(error);
//   }
// }

  const {messageId}=req.query;
  console.log(req.query);
  console.log('messageId');
  console.log(messageId);
  if(messageId){
    try{const messages=await Message.findAll({
      where:{id:{[Sequelize.Op.gt]:messageId},
         GroupId:req.group.id,
   include:{
      model:chatUser,
      }
},
    })
    return  res.status(200).json({Messages:messages});
  }catch(error){
     return res.status(500).json({error:error});    
  }
  }
  else{
    const totalEntries=await Message.count();
  console.log('totalEntries');
  console.log(totalEntries);
  console.log('req.group');
  console.log(req.group);
   try{ const messages=await Message.findAll({
    where:{
      GroupId:req.group.id,
    },
    order: [['createdAt', 'ASC']],
    offset:Math.max(totalEntries-10,0),
    include: [{
      model: chatUser
    }]
  });
    res.status(200).json({Messages:messages});

  }catch(error){
    console.log(error);
     return res.status(500).json({error:error});
   }
}

}
