const jwt=require('jsonwebtoken');
const User=require('../models/User');
const authenticate=(req,res,next)=>{
    try{
        console.log('req');
        console.log(req.header);
        const token=req.header('Authorization');
        console.log("here is token");
        console.log(token);
        const user=jwt.verify(token,'secretKey');
        console.log('userId>>>'+user.userId);
        User.findByPk(user.userId)
        .then(user=>{
            console.log('userDetails in auth.js');
            console.log(user);
            req.user=user;
            console.log('req.user');
            console.log(req.user);
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