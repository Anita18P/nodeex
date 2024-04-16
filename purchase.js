const Razorpay=require('razorpay');
const order=require('../models/order');
require('dotenv').config();

const purchasePremium=async(req,res)=>{
    try{
        // console.log(process.env.RAZORPAY_KEY_ID)
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        });
        const amount=2500;
        rzp.orders.create({
            amount,currency:"INR"
        },(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({
                Orderid:order.id,
                Status:"PENDING"
            }).then(()=>{
                return res.status(201).json({
                    order,
                    key_id:rzp.key_id
                });
            }).catch(err=>{
                throw new Error(err);
            })
        })
    }catch(err){
        console.log(err);
       return res.status(403).json({message:"Something went wrong",error:err})
    }
};
const updateTransactionStatus=(req,res)=>{
    try{
        console.log("in update transaction status");
        console.log("req.body");
        console.log(req.body);
        const {payment_id,order_id}=req.body
        
            order.findOne({
                where:{
                    Orderid:order_id
                }
            }).then(order=>{
                order.update({Paymentid:payment_id,status:"Successful"})
                 .then(()=>{
                     req.user.update({isPremiumuser:true})
                     .then(()=>{
                      return res.status(202).json({success:true,message:"Transaction Successful"});
                      }).catch((err)=>{
                         throw new Error(err);
                       })
            
                 }).catch((err)=>{
                throw new Error(err);
            })
        }).catch((err)=>{
            throw new Error(err);
        })
        
    }catch(err){
            console.log(err);
            res.status(403).json({success:false,message:"something went wrong"});
        }
    
}


module.exports={
    purchasePremium,
    updateTransactionStatus
}