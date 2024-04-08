const express = require('express');
const attendance= require('../models/calender');
const router=express.Router();
const admincontrollers=require('../controllers/adminc');

router.get('/attendance-Summary',admincontrollers.attendanceSummary);
router.get('/:date',admincontrollers.getAttendancePage);
 router.post('/add-attendance',admincontrollers.postAttendance);

// router.post('/add-user',admincontrollers.postDetails);

// router.delete('/delete/:id',admincontrollers.deleteDetails);

module.exports = router;

