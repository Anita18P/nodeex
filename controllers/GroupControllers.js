const Message=require('../models/messages');
const chatUser=require('../models/users');
const Groups=require('../models/Group');
const Member=require('../models/member');
const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const jwt=require('jsonwebtoken');
const { noDoubleNestedGroup } = require('sequelize/lib/utils/deprecations');

exports.postGroup=async(req,res)=>{
    console.log('I m in post Group');
    const t= await sequelize.transaction();

    console.log('req.user');
    console.log(req.user);
    console.log('req.group');
    console.log(req.group);
    console.log('req.body');
    console.log(req.body);
    try{
    const GroupData=await Groups.create({
        name:req.body.GroupName,
        chatUserId:req.user.id,
        transaction:t

    })
    const MemberData=await Member.create({
        memberName:req.user.Name,
        GroupId:GroupData.id,
        chatUserId:req.user.id,
        Admin:true,
        transaction:t

    })
    console.log('GroupData');
    console.log(GroupData);
    console.log('GroupData.name');
    console.log(GroupData.name);
    MemberData.dataValues.Group={
        name:GroupData.name};
    
    t.commit();
    res.status(200).json({GroupData:GroupData ,MemberData:MemberData,Success:"Group created Successfully"});
}catch(error){
    t.rollback();
    console.log(error);
    res.status(500).json({failure:error});
}
}
function generateAccessToken(id,name,Admin,groupName){
    return jwt.sign({groupId:id,username:name,groupname:groupName,Admin:Admin},'secretKey');
}
exports.getGroup=async(req,res)=>{
  try{ const groupData=await Member.findAll({
        where:{
            chatUserId:req.user.id
        },
        include:{
         model:Groups,
         attributes:['name']

        }
    })
    console.log(groupData);
    res.status(200).json({groupData:groupData});
 }catch(error){
    console.log(error);
    res.status(500).json({error:error});
 }

}
exports.groupEntry=async(req,res)=>{
    console.log('in group entry function');
    console.log('req.body');
    console.log(req.body);
    console.log(typeof(req.body.groupDetails));
    const groupD=req.body.groupDetails;
    console.log('groupD');
    console.log(groupD);
    console.log(typeof(groupD));
    console.log(groupD.id);
    const GroupId=groupD.GroupId;
    console.log('groupId');
    console.log(GroupId);
    const gname=groupD.name;
    console.log('gname');
    console.log(gname);
    const chatUserId=groupD.chatUserId;
    console.log(chatUserId);
//check if member or not
try{const groupData=await Member.findAll({
    where:{
        GroupId:GroupId,
        chatUserId:chatUserId
    },
    include:{
        model:Groups,
        attributes:['name']
    }

})
console.log('groupData');
console.log(groupData);
console.log('groupData[0].GroupId');
console.log(groupData[0].GroupId);
console.log('groupData[0].chatUserId');
console.log(groupData[0].chatUserId);
console.log('groupData[0].Group.name');
console.log(groupData[0].Group.name);
console.log('groupData.length');
console.log(groupData.length);

 if(groupData.length>0){
    return res.status(200).json({message:"user check in successfully",groupData:groupData,grouptoken: generateAccessToken(groupData[0].GroupId,groupData[0].name,groupData[0].chatUserId,groupData[0].Group.name)})

 }
 else{
    throw new Error("group not present");
 }
}catch(error){
    res.status(500).json({error:error});
}
};
