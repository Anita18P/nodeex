const expenseApp=require('../models/expense');
const sequelize = require('../util/database');

exports.addExpenses=async(req,res,next)=>{
    console.log('in postexpense method')
     console.log(req.body);
    try{  const expense=req.body.Amount;
        console.log('check it');
        console.log(expense);
    const description=req.body.Description;
    const expensecat=req.body.ExpenseCategory;
    console.log("req");
    console.log(req);
    const data= await expenseApp.create({
        Amount:expense,
        Description:description,
        Category:expensecat,
        UserDetailId:req.user.id,
        
    });
    console.log(data);
    res.status(201).json({newExpenseDetails:data});
}
catch(err){
    console.log('expense posting error');
    console.log(err);
}

};
exports.getExpenses=async(req,res,next)=>{
    console.log("get expenses req.user.id");
    console.log(req.user.id);
    try {
        const expenses=await req.user.getExpenseDetails()
    //     const expenses= await expenseApp.findAll({where:{
    //     userDetailId:req.user.id
    // }
    // })
        res.status(200).json({allExpense:expenses,isPremiumuser:req.user.isPremiumuser});
     }catch(err){console.log(err)};
   
};
exports.deleteExpense=async(req,res,next)=>{

    const id=req.params.id;
    console.log('req.user.id');
    console.log(req.user.id);
    console.log('req.body.UserDetailId');
    console.log(req.body);
  
   
     try{   const data=await expenseApp.destroy({
            where:{
                id:id,
                UserDetailId:req.user.id
            }
        }); 
        if(data===0){
            return res.status(500).json({message:"expense does not belong to the user",success:false})
        }
       return res.sendStatus(200).json({message:"deleted successfully",success:true});

    }catch(error){
       return  res.status(400).json({message:"unauthorised user",success:false})

    }
  
}