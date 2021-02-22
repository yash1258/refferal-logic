const express= require('express');
const router = express.Router();

const TransactionController = require('../../controllers/payment/transaction.controller');
   


const transactionController = new TransactionController();

router.get('/filter_by_date', transactionController.filter_by_date);
router.post('/fix_date', transactionController.fix_date_of_transaction);
router.get('/transaction_detail', transactionController.transaction_detail);
router.post('/fix_transaction_db_with_new_product', transactionController.fix_transaction_db_with_new_product);

module.exports=router;
