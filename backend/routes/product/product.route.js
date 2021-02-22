const express= require('express');
const router = express.Router();
const ProductController = require('../../controllers/product/product.controller');

const productController = new ProductController();

router.get('/', productController.get_products);
router.post('/', productController.set_product);
router.post('/set_available_service', productController.set_available_services);
router.get('/get_available_service', productController.get_available_services);
// router.post('/get_product_by_id', productController.get_product_by_id);

module.exports=router;
