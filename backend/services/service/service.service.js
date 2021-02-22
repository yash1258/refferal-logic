const { response } = require('express');
const serviceModel = require('../../models/service');



class ServiceService  {
    constructor() {
    }

    async create_feature(request){
        console.log("ServiceService");
        console.log(request);
        let feature= new serviceModel(request);
        let response=await  feature.save();
        return response;
    }

    async get_feature(){
        let response = await serviceModel.find({});
        return response;
    }

    // async delete_feature(request){
    //     let response = await serviceModel.deleteOne(re)

    //     User.findOneAndDelete({age: {$gte:5} }, function (err, docs) { 
    //         if (err){ 
    //             console.log(err) 
    //         } 
    //         else{ 
    //             console.log("Deleted User : ", docs); 
    //         } 
    //     }); 
    // }

    // async delete_feature(req){
    //     let feature = new serviceModel(req)
    //     console.log("delete services")
    //     let response = await feature.findByIdAndDelete(req.body, function (err, docs) { 
    //         if (err){ 
    //             console.log(err) 
    //         } 
    //         else{ 
    //             console.log("Deleted ", docs)
    //         }
            
    //     });
    //     // console.log(serviceModel)
    //     return response
    // }

    async delete_feature(req){
        
        let id = req._id;
        let response = await serviceModel.findOneAndDelete(id);
        
    }

    // async update_feature(req){
    //     let data = serviceModel.findOne(req)
    //     let ff = req.body.id
    //     let response = serviceModel.findOneAndUpdate(ff , req);
    //     return response; 
    // }
    
    // async update_feature(req){
    //     // let id = serviceModel.id;
    //     let ide = req._id ;
    //     console.log(ide);
    //     let response= await serviceModel.update({_id : ide }, {req});
    //     console.log(response);
    //     return response;
    // }

    async update_feature(req){
        let pp = req._id;
        let feature = await serviceModel.findById(pp);
        console.log(feature);
        feature.service_name= req.service_name;
        feature.service_price= req.service_price;
        
        let response = await feature.save();
        return response;
        


    }
    // async get_Services() {
    //   let response = await model.find({});
    //   return response;  
    // }

    // async set_product(data) {
    //     let product = new model(data);
    //     let response = await product.save();
    //     return response;
    // }
}

module.exports = ServiceService;