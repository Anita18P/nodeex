const bookApps=require('../models/apdetails');
exports.getPage=(req,res,next)=>{
    res.render('bookapp');
};
exports.getDetails=async (req,res,next)=>{
  
    const appointments= await bookApps.findAll();
    console.log(appointments);
    res.status(200).json({alluser:appointments});
};

exports.postDetails=async (req,res,next)=>{
    try{ console.log("in post method admin route");
     const name=req.body.Name
     const email=req.body.Email;
     const phone=req.body.Phone;
     console.log(name);
     console.log(phone);
     console.log(email);
 
     console.log('before creating table');
     const data= await bookApps.create({
         name:name,
         email:email,
         phone:phone
 
     });
     res.status(201).json({newUserDetails:data});
 }catch(err){
         console.log(err);
         console.log('error occured in sql');
     };
  };

  exports.deleteDetails=async (req,res,next)=>{
    try{const result= await bookApps.destroy({
        where:{
         id:req.params.id
        } 
     });
       res.sendStatus(200);
     }catch(error){
         console.log(error);
         console.log('delete error');
     }
    
  };