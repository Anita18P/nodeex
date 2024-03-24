const express = require('express');
const bookApps = require('../models/expenseDetails');
const router=express.Router();
const admincontrollers=require('../controllers/adminc');

router.get('/get-expense',admincontrollers.getExpenseDetails);

router.post('/add-expense',admincontrollers.postExpenseDetails);

router.delete('/delete-expense/:id',admincontrollers.deleteExpenseDetails);
router.put('/edit-expense',admincontrollers.editExpenseDetails);
module.exports = router;