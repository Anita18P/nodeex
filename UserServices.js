const getExpenses=(req)=>{
    return req.user.getExpenseDetails();
}









module.exports={
    getExpenses,
    
}