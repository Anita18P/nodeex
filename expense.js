const { Json } = require('sequelize/lib/utils');
const expenseApp=require('../models/expense');
const sequelize = require('../util/database');
const AWS=require('aws-sdk');
const userServices=require('../services/UserServices');
const s3Services=require('../services/S3services');
const filesDownloaded=require('../models/filesDownloaded');

exports.getfiles=async(req,res)=>{
    console.log('in get files function')
    try{const filesData=await req.user.getFilesDownloadeds();
    console.log(filesData);
        res.status(200).json({filesData});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

exports.downloadExpenses=async(req,res,next)=>{
    const expenses= await userServices.getExpenses(req);
    console.log("expenses in download function");
    console.log(expenses);
    const userId=req.user.id;
    const stringifiedExpenses=JSON.stringify(expenses);
    const filename=`Expense${userId}/${new Date()}.text`;
    console.log("now the s3Service uploadToS3 will call ");
    const fileURl= await s3Services.uploadToS3(stringifiedExpenses,filename);
    console.log('below is fileURl.Location'); 
    console.log(fileURl.Location);
    const stringifiedurl=JSON.stringify(fileURl.Location);
    console.log('stringifiedurl');
    console.log(stringifiedurl);
    console.log(stringifiedurl.length);

    await req.user.createFilesDownloaded({url:fileURl.Location});
   return res.status(201).json({fileURl,Success:true});



}


exports.addExpenses=async(req,res,next)=>{
    console.log('in postexpense method')
     console.log(req.body);
     const t= await sequelize.transaction();
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
     },{transaction:t});
   const user=await req.user.update({
        total_Expenses:req.user.total_Expenses+parseInt(data.Amount),
   },{where:{id:req.user.id}, transaction:t
     })
    console.log(data);
     await t.commit();
    res.status(201).json({newExpenseDetails:data});
}
catch(err){
    console.log('expense posting error');
     await t.rollback();
    console.log(err);
}

};
exports.getExpenses=async(req,res,next)=>{
    console.log("get expenses req.user.id");
    const itemsPerPage = parseInt(req.query.limit) || 3;
 
    const currentPage = parseInt(req.query.page) || 1;
    console.log(req.user.id);
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
        console.log("error of get function");
        console.log(err);
        res.status(500).json(err);
    };
   
};
exports.deleteExpense=async(req,res,next)=>{

    const id=req.params.id;
    console.log('req.user.id');
    console.log(req.user.id);
    console.log('req.body.UserDetailId');
    console.log(req.body);
    const t=await sequelize.transaction();
  try{   const data=await expenseApp.destroy({
            where:{
                id:id,
                UserDetailId:req.user.id
            }
     },{transaction:t});
     console.log(req.user.total_expenses); 
  
     const userData=await req.user.update({
        total_Expenses:(req.user.total_Expenses-parseInt(req.body.Amount)),
     },
        {where:{id:req.user.id}},{transaction:t}
     ); 
     console.log("data")
     console.log(data);
    if(data===0 && !userData){
            // await t.rollback();
            // @ts-ignore
            return new Error({message:"expense does not belong to the user",success:false});
        }
        else{
       await t.commit()
       return res.sendStatus(200).json({message:"deleted successfully",success:true});
        }
    }  catch(error){
        await t.rollback();
       return  res.status(400).json({Error:error},{message:"unauthorised user",success:false})

    }
  
}