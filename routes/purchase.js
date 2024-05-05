const express = require('express');
const purchaseControllers=require('../controllers/purchase');
const userAuthentication=require('../middleware/auth');
const router=express.Router();
router.get('/purchase/premiummembership',userAuthentication.authenticate,purchaseControllers.purchasePremium);
router.post('/purchase/updateTransactionStatus',userAuthentication.authenticate,purchaseControllers.updateTransactionStatus);



module.exports = router;