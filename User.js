const express = require('express');
const attendance= require('../models/User');
const router=express.Router();
const admincontrollers=require('../controllers/user');
const expenseControllers=require('../controllers/expense');
router.get('/expense/get-expense',expenseControllers.getExpenses);
router.post('/expense/add-expense',expenseControllers.addExpenses);
router.post('/user-login',admincontrollers.userLogin);
 router.post('/sign-up',admincontrollers.postUserDetails);
 router.delete('/expense/delete-expenses/:id',expenseControllers.deleteExpense);



 module.exports = router;