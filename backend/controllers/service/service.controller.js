const { CONSOLE_APPENDER } = require('karma/lib/constants');
const serviceModel = require('../../models/service');
const ServiceService = require('../../services/service/service.service');
const serviceService = new ServiceService();
class serviceController {
    constructor() {
    

    }

    async create_feature(req, res, next) {
        try {
            console.log('service controller');
            console.log(req.body);

            let response = await serviceService.create_feature(req.body);
            console.log(response);
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    }

    async get_feature(req, res, next){
        try{
            console.log('get request recieved');
            let response= await serviceService.get_feature();
            res.json(response);
        }catch (err) {
            console.log(err);
        }


    }
    
    async delete_feature(req, res, next){
        try{
            console.log('backend delete called')
            console.log(req);
            let response = await serviceService.delete_feature(req.body);
            console.log('response');
            
        }catch (err) {
            console.log(err);
        }
            


        }
    async update_feature(req, res){
        try{
            // let feat= serviceModel;
            // let req = feat.service_name;
            console.log('kkk')
            console.log(req.body)
            let response = await serviceService.update_feature(req.body);
            console.log('feature updated');
            res.json(response);
        }catch (err) {
            console.log(err);
        }
    }
    }
    
    // async get_products(req, res, next) {
    //     try {
    //         let response = await productService.get_products() 
    //         console.log(response);
    //         res.send(response);
    //     } 
    //     catch(err) {
    //         console.log(err);
    //     }
    // }

    // async set_product(req, res, next) {
    //     try {
    //         let response = await productService.set_product(req.body);
    //         res.json(response);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


module.exports=serviceController;