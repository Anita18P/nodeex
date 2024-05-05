const User=require('../models/User');
const sequelize = require('../util/database');
const {Sequelize,Op}=require('sequelize');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
 
exports.postUserDetails=async (req,res,next)=>{
 try{const Name=req.body.Name;
    const Email=req.body.Email;
    const Password=req.body.Password;
  
    const saltRound=10;
    bcrypt.hash(Password,saltRound,async(err,hash)=>{
        if(!err){
            const data=await User.create({
                Name:Name,
                Email:Email,
                 Password:hash,
            })
        }
        else{
            throw new Error("somthing went wrong");
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
    const Email=req.body.Email;
    const Password=req.body.Password;
    const user=await User.findAll({
        where:{
            Email:Email
        }
        
        
    })
    if(user.length>0){
        bcrypt.compare(Password,user[0].Password,(err,result)=>{

            if(err){
            console.log("while decrypting");
           throw new Error("Something went wrong");
        }
        if(result===true){
           return res.status(201).json({message:"user Logged in Successfully",success:true,token:generateAccessToken(user[0].id,user[0].Name,user[0].isPremiumuser)});
        }
        else{
           return res.status(401).json({message:"user Not Authorised",success:false});

        }
       })
    }else{
       return res.status(404).json({message:"user does not exist ",success:false});
    }
    


    //  const userPass=await User.findOne({
    //     where:{
    //         Email:Email,
    //         where:Sequelize.where(Sequelize.fn('BINARY', Sequelize.col('Password')),
    //         {
    //             [Op.eq]:Password,
    //         })
                
            
    //     }

    //  })
    //  if(!userPass){
    //     res.status(401).json({message:"user Not Authorised",success:false});
    //  }

    // res.status(201).json({message:"user Logged in Successfully",success:true});

}catch(error){
    console.log(error);
    res.status(500).json({message:error,success:false});
    
}
};