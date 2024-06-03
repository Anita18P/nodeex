const User=require('../models/users');
const sequelize = require('../util/database');
const {Sequelize,Op}=require('sequelize');
const Notification=require('../models/notifications');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
 
exports.postUserDetails=async (req,res,next)=>{
    console.log(req.body);
 try{const Name=req.body.Name;
    const Email=req.body.Email;
    const PhoneNumber=req.body.PhoneNumber;
    const Password=req.body.Password;
    const saltRound=10;
    const user= await User.findOne({
        where:{
            Email:Email
        }
    })
    console.log(user);
    if(user){
       return res.status(200).json({message:"user already exist please login"})
    }
    bcrypt.hash(Password,saltRound,async(err,hash)=>{
      try{  if(!err){
            const data=await User.create({
                Name:Name,
                Email:Email,
                PhoneNumber:PhoneNumber,
                Password:hash,
            })
        }
        else{
            throw new Error("something went wrong");
        }
    }catch(error){
        throw new Error("user already exist");
    }
    })
   
       res.status(200).json({message:"user created successfully"});
}catch(error){
    console.log(error);
    res.status(403).json({message:error,success:false});
}
    
};
function generateAccessToken(id,name,isPremiumuser){
    return jwt.sign({userId:id,name:name,isPremiumuser:isPremiumuser},'secretKey');
}
exports.userLogin=async (req,res,next)=>{
   try{ 
    console.log(req.body);
    const Email=req.body.Email;
    const Password=req.body.Password;
    const user=await User.findAll({
        where:{
            Email:Email
        }
    })
    console.log(user);
    if(user.length>0){
        bcrypt.compare(Password,user[0].Password,(err,result)=>{
         if(err){
            console.log("while decrypting");
           throw new Error("Something went wrong");
        }
        if(result===true){
           return res.status(201).json({message:"user Logged in Successfully",success:true,token:generateAccessToken(user[0].id,user[0].Name,user[0].PhoneNumber)});
        }
        else{
           return res.status(401).json({message:"user Not Authorised",success:false});
          }
       })
    }else{
       return res.status(404).json({message:"user does not exist ",success:false});
    }

}catch(error){
    console.log(error);
    res.status(500).json({message:error,success:false});
  }
};
exports.getUser=async(req,res)=>{
    console.log('i m in get user route');
   try{ console.log(req.params);
    const PhoneNumber=req.params.PhoneNumber;
    
    const userData=await User.findAll({
       where:{ PhoneNumber:PhoneNumber
       }
    })
    console.log('userData');
    console.log('userData');
    console.log(userData);
    console.log(userData[0].id);
    console.log(req.group);
    if(userData){
        Notification.create({
            link:req.group.name,
            userId:userData[0].id,
            chatUserId:req.user.id,
            GroupId:req.group.id
        })
        

        res.status(200).json({message:"notification sent to user"});
    }
    
}catch(error){
    console.log(error);
    res.status(500).json({error:error,message:"user does not exist"});
}
}
