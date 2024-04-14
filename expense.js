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
        res.status(200).json({allExpense:expenses});
     }catch(err){console.log(err)};
   
};
exports.deleteExpense=async(req,res,next)=>{

    const id=req.params.id;
    console.log('req.user.id');
    console.log(req.user.id);
    console.log('req.body.UserDetailId');
    console.log(req.body);
  
    if(req.user.id===req.body.UserDetailId){
        await expenseApp.destroy({
            where:{
                id:id
            }
        }); 
        res.sendStatus(200);

    }
    else{
        res.status(400).json({message:"unauthorised user",success:false})
    }
   
}