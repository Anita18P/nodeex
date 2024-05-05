const express = require('express');
//const expenseControllers=require('../controllers/expense');
//const userAuthentication=require('../middleware/auth');
const forgotPassword=require('../controllers/forgotpassword');
const router=express.Router();
router.get('/password/updatepassword/:id',forgotPassword.updatepassword);
router.get('/password/resetpassword/:id',forgotPassword.resetpassword);
router.post('/password/forgotpassword',forgotPassword.forgotpassword);
//router.delete('/expense/delete-expenses/:id',userAuthentication.authenticate,expenseControllers.deleteExpense);


module.exports = router;