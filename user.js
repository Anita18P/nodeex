const User=require('../models/User');
 
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
}
    
}