const model = require('../../models/product');
const serviceModel = require('../../models/services');


class ProductService  {
    constructor() {

    }

    async get_products() {
      let response = await model.find({});
      return response;  
    }

    async get_product_by_id(id) {
      let response = await model.findOne({_id: id});
      return response;  
    }

    async set_product(data) {
        let product = new model(data);
        let response = await product.save();
        return response;
    }
    async set_available_services(data) {
      let service = new serviceModel(data);
      let response = await service.save();
      return response;
  }
  async get_available_services() {
    let response = await serviceModel.find({});
    return response;  
  }
}

module.exports = ProductService;