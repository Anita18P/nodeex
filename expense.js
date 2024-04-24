const express = require('express');
const expenseControllers=require('../controllers/expense');
const userAuthentication=require('../middleware/auth');
const router=express.Router();


router.get('/expense/get-expense',userAuthentication.authenticate,expenseControllers.getExpenses);
router.post('/expense/add-expense',userAuthentication.authenticate,expenseControllers.addExpenses);
router.delete('/expense/delete-expenses/:id',userAuthentication.authenticate,expenseControllers.deleteExpense);
router.get('/expense/download',userAuthentication.authenticate,expenseControllers.downloadExpenses);
router.get('/expense/getfiles',userAuthentication.authenticate,expenseControllers.getfiles);

module.exports = router;