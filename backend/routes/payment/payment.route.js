const express= require('express');
const router = express.Router();

const PaymentController = require('../../controllers/payment/payment.controller');
   


const paymentController = new PaymentController();

router.post('/order', paymentController.get_order_id);
router.post('/verify', paymentController.verify_order);
router.post('/fetch-transactions', paymentController.get_user_transactions);

module.exports=router;
