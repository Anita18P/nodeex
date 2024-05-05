const { Json } = require('sequelize/lib/utils');
const expenseApp=require('../models/expense');
const sequelize = require('../util/database');
const AWS=require('aws-sdk');
const userServices=require('../services/UserServices');
const s3Services=require('../services/S3services');
const filesDownloaded=require('../models/filesDownloaded');

exports.getfiles=async(req,res)=>{
    try{const filesData=await req.user.getFilesDownloadeds();
        res.status(200).json({filesData});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

exports.downloadExpenses=async(req,res,next)=>{
    const expenses= await userServices.getExpenses(req);
    const userId=req.user.id;
    const stringifiedExpenses=JSON.stringify(expenses);
    const filename=`Expense${userId}/${new Date()}.text`;
    const fileURl= await s3Services.uploadToS3(stringifiedExpenses,filename);
    const stringifiedurl=JSON.stringify(fileURl.Location);
    await req.user.createFilesDownloaded({url:fileURl.Location});
   return res.status(201).json({fileURl,Success:true});



}


exports.addExpenses=async(req,res,next)=>{
     const t= await sequelize.transaction();
    try{  const expense=req.body.Amount;
    const description=req.body.Description;
    const expensecat=req.body.ExpenseCategory;
    const data= await expenseApp.create({
        Amount:expense,
        Description:description,
        Category:expensecat,
        UserDetailId:req.user.id,
     },{transaction:t});
   const user=await req.user.update({
        total_Expenses:req.user.total_Expenses+parseInt(data.Amount),
   },{where:{id:req.user.id}, transaction:t
     })
     await t.commit();
    res.status(201).json({newExpenseDetails:data});
}
catch(err){
     await t.rollback();
    console.log(err);
}

};
exports.getExpenses=async(req,res,next)=>{
    const itemsPerPage = parseInt(req.query.limit) || 3;
    const currentPage = parseInt(req.query.page) || 1;
    try {
        const expenses=await req.user.getExpenseDetails()
        const totalPages = Math.ceil(expenses.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, expenses.length);
    //     const expenses= await expenseApp.findAll({where:{
    //     userDetailId:req.user.id
    // }
    // })
    const paginatedExpenses = expenses.slice(startIndex, endIndex);
    res.status(200).json({
        allExpense: paginatedExpenses,
        currentPage: currentPage,
        totalPages: totalPages,
        isPremiumuser:req.user.isPremiumuser
    });
        
     }catch(err){
        console.log(err);
        res.status(500).json(err);
    };
   
};
exports.deleteExpense=async(req,res,next)=>{

    const id=req.params.id;
    const t=await sequelize.transaction();
  try{   const data=await expenseApp.destroy({
            where:{
                id:id,
                UserDetailId:req.user.id
            }
     },{transaction:t});
  
     const userData=await req.user.update({
        total_Expenses:(req.user.total_Expenses-parseInt(req.body.Amount)),
     },
        {where:{id:req.user.id}},{transaction:t}
     ); 
    if(data===0 && !userData){
            // await t.rollback();
            // @ts-ignore
            console.log("in if statement")
            throw new Error({message:"expense does not belong to the user",success:false});
        }
        else{
       await t.commit()
       return res.status(200).json({message:"deleted successfully",success:true});
        }
    }  catch(error){
        console.log(error);
      
            await t.rollback();
          return  res.status(400).json({Error:error},{message:"unauthorised user",success:false})

    }
  
}