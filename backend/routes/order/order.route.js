const express= require('express');
const router = express.Router();
const OrderController = require('../../controllers/order/order.controller');

const orderController = new OrderController();

router.get('/orderdetails', orderController.get_orders);

module.exports=router;
