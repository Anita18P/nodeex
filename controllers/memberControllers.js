const Message=require('../models/messages');
const chatUser=require('../models/users');
const Groups=require('../models/Group');
const Member=require('../models/member');
const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const jwt=require('jsonwebtoken');
const { noDoubleNestedGroup } = require('sequelize/lib/utils/deprecations');



exports.removeMembers=async(req,res)=>{
    console.log('in remove members functions');
    console.log('req.query');
    console.log(req.query);
    try{const {memberId}=req.query;
    const data=await Member.destroy({
        where:{
            id:memberId
        }
    })
    res.status(204).json({message:"member deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

}
exports.getMembers=async(req,res)=>{
    console.log('in get members function');
    console.log('req.group');
    console.log(req.group);
    console.log('req.user');
    console.log(req.user);
   try{ const memberData=await Member.findAll({
        where:{
            GroupId:req.group.id
        }
    })
    console.log('memberData');
    console.log(memberData);
    res.status(200).json({data:memberData});
   }catch(error){
    console.log(error);
    res.status(500).json({error:error});
   }
}
exports.makeAdmin=async(req,res)=>{
    console.log('makeAdmin function');
    console.log('req.body');
    console.log(req.body);
    const {GroupId}=req.body;
    console.log(GroupId);
    const {chatUserId}=req.body;
    console.log(chatUserId);
    try{const data=await Member.update({
        Admin:true,
    },{where:{GroupId:GroupId,chatUserId:chatUserId} })
     res.status(201).json({message:"updated successfully"});
}catch(error){
    console.log(error);
    res.status(500).json({error:error});
}
    }
   