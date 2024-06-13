const Message=require('../models/messages');
const chatUser=require('../models/users');
const Sequelize=require('sequelize');
const Group=require('../models/Group');
const Member=require('../models/member');
const AWS = require('aws-sdk');
const multer = require('multer');


// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
});
const bucketName = "chatapp18";

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");
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
    upload(req, res, async function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "File upload failed" });
      }
      try {
        const messageContent = req.body.message;
        const userId = req.user.id;
        const groupId = req.group.id;
        console.log(messageContent);
        console.log(userId);
        console.log('req.group');
        console.log(req.group.id);
        console.log(groupId);
        let fileUrl = null;
        if (req.file) {
          const fileName = Date.now() + "-" + req.file.originalname;
          const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            ACL:'public-read'
          };
          try {
            const data = await s3.upload(params).promise();
            fileUrl = data.Location;
          } catch (s3Error) {
            console.error("Error uploading file to S3:", s3Error);
            return res.status(500).json({ message: "File upload to S3 failed" });
          }
        }
  
  
    const messageData = await Message.create({
      Messages: messageContent,
      fileUrl: fileUrl,
      chatUserId: userId,
      GroupId: groupId,
    });

    messageData.dataValues.chatUser=req.user;
 //console.log('req.io');
   // console.log(req.io);
  
    req.io.emit('newMessage',messageData);
    res.status(201).json({message:messageData});
}catch(error){
  console.log(error);
  res.status(500).json({error:error});
}
    });
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
