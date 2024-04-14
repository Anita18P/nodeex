const express = require('express');
const attendance= require('../models/User');
const admincontrollers=require('../controllers/user');
const expenseControllers=require('../controllers/expense');
const userAuthentication=require('../middleware/auth');
const router=express.Router();
router.get('/expense/get-expense',userAuthentication.authenticate,expenseControllers.getExpenses);
router.post('/expense/add-expense',userAuthentication.authenticate,expenseControllers.addExpenses);
router.post('/user-login',admincontrollers.userLogin);
 router.post('/sign-up',admincontrollers.postUserDetails);
 router.delete('/expense/delete-expenses/:id',userAuthentication.authenticate,expenseControllers.deleteExpense);



 module.exports = router;