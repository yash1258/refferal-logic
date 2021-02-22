const model = require('../../models/product');
const ProductService = require('../../services/product/product.service');
const productService = new ProductService();
class ProductController {
    constructor() {

    }

    async get_products(req, res, next) {
        try {
            let response = await productService.get_products() 
            console.log('got products');
            res.send(response);
        } 
        catch(err) {
            console.log(err);
        }
    }

    async get_product_by_id(req, res, next) {
        try {
            let id = req.body.product_id;
            let response = await productService.get_product_by_id(id); 
            console.log('got products');
            res.send(response);
        } 
        catch(err) {
            console.log(err);
        }
    }

    async set_product(req, res, next) {
        try {
            let response = await productService.set_product(req.body);
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    }
    async set_available_services(req, res, next) {
        try {
            let response = await productService.set_available_services(req.body);
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    }
    async get_available_services(req, res, next) {
        try {
            let response = await productService.get_available_services();
            console.log(response);
            res.send(response);
        } 
        catch(err) {
            console.log(err);
        }
    }
   
}

module.exports=ProductController;