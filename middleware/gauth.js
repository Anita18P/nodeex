const jwt=require('jsonwebtoken');
const User=require('../models/users');
const Group=require('../models/Group');
const groupAuthenticate=async(req,res,next)=>{
    try{console.log('groupAuthentication middleware');   
    const grouptoken=req.header('GroupAuthorization');
    console.log('grouptoken');
    console.log(grouptoken);
    const groupData=jwt.verify(grouptoken,'secretKey');
    console.log('groupData'); 
    console.log(groupData); 
    console.log('groupData.id'); 
    console.log(groupData.groupId); 
   Group.findByPk(groupData.groupId)
    .then(group=>{
        console.log(group);
        req.group=group;
        next();
    });
    
}
catch(error){
    console.log(error);
}
  
       
    }
    module.exports={
     groupAuthenticate
   
    };