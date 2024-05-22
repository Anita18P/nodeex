const jwt=require('jsonwebtoken');
const User=require('../models/users');
//const token_secret=process.env.TOKEN_SECRET;
const authenticate=(req,res,next)=>{
    try{
    
        const token=req.header('Authorization');
        console.log('token');
        console.log(token);
        const user=jwt.verify(token,'secretKey');
        User.findByPk(user.userId)
        .then(user=>{
            req.user=user;
            next();
        })
    }catch(error){
        console.log(error);
        return res.status(401).json({success:false});
    }
}
 module.exports={
    authenticate
 };