const User=require('../models/users');
const sequelize = require('../util/database');
const {Sequelize,Op}=require('sequelize');
const bcrypt=require('bcryptjs');
//const jwt=require('jsonwebtoken');
 
exports.postUserDetails=async (req,res,next)=>{
    console.log(req.body);
 try{const Name=req.body.Name;
    const Email=req.body.Email;
    const PhoneNumber=req.body.PhoneNumber;
    const Password=req.body.Password;
    const saltRound=10;
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
