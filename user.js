const User=require('../models/User');
const sequelize = require('../util/database');
const {Sequelize,Op}=require('sequelize');
 
exports.postUserDetails=async (req,res,next)=>{
    console.log("in postUserDetails");
    console.log(req.body);
 try{const Name=req.body.Name;
        console.log(Name);
    const Email=req.body.Email;
    console.log(Email);
  
    const Password=req.body.Password;
    console.log(Password);
    const data=await User.create({
        Name:Name,
        Email:Email,
         Password:Password,
    })
       res.status(200).json({userData:data});
}catch(error){
    console.log(error);
res.status(403).json(error);
}
    
};
exports.userLogin=async (req,res,next)=>{
    console.log('userLogin function');
   try{ 
    const Email=req.body.Email;
    const Password=req.body.Password;
    const user=await User.findOne({
        where:{
            Email:Email
        }
        
        
    })
    if(!user){
        res.status(404).json({message:"user does not exist ",success:false});
    }
     const userPass=await User.findOne({
        where:{
            Email:Email,
            where:Sequelize.where(Sequelize.fn('BINARY', Sequelize.col('Password')),
            {
                [Op.eq]:Password,
            })
                
            
        }

     })
     if(!userPass){
        res.status(401).json({message:"user Not Authorised",success:false});
     }

    res.status(201).json({message:"user Logged in Successfully",success:true});

}catch(error){
    console.log(error);
    
}
}