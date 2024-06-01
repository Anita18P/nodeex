const notifications=require('../models/notifications');
//const chatUser=require('../models/users');
const Sequelize=require('sequelize');
const Member=require('../models/member');


exports.getNotifications=async(req,res)=>{
    console.log('in get notification');
    console.log(req.user);
   try{ const notifData= await notifications.findAll({
        where:{
          userId:req.user.id
        }
    })
   
    res.status(201).json({data:notifData});
  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}
exports.joingroup=async(req,res)=>{
  console.log('req.body');
  console.log(req.body);
  const groupData=JSON.parse(req.body.notifiDetails);
  console.log(groupData);
  //check if already a member
 const data=await Member.findAll({
  where:{
    GroupId:groupData.GroupId,
    chatUserId:groupData.userId,

  }
})
console.log('data');
console.log(data.length);
  if(!data){
    
    return res.status(200).json({message:"You are already a member"});

  }
  else{
    try{const memberData=await Member.create({
      memberName:req.user.Name,
      GroupId:groupData.GroupId,
      chatUserId:req.user.id,
    })
    res.status(201).json({data:memberData,message:"you have joined group successfully"});

  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
  }
    

//   if(messageId){
//     try{const messages=await Message.findAll({
//       where:{id:{[Sequelize.Op.gt]:messageId}},
//       include:{
//         model:chatUser
//       }
//     })
//     return  res.status(200).json({Messages:messages});
//   }catch(error){
//      return res.status(500).json({error:error});    
//   }
//   }
//   else{
//     const totalEntries=await Message.count();
//   console.log('totalEntries');
//   console.log(totalEntries);
//    try{ const messages=await Message.findAll({
//     order: [['createdAt', 'ASC']],
//    offset:totalEntries-10,
//     include: [{
//       model: chatUser
//     }]
//   });
//     res.status(200).json({Messages:messages});

//   }catch(error){
//     console.log(error);
//      return res.status(500).json({error:error});
//    }
// }

}