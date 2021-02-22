const express= require('express');
const router = express.Router();

const ServiceController = require('../../controllers/service/service.controller');
   


const serviceController = new ServiceController();
//post request to create a feature
router.post('/create', serviceController.create_feature);
//get request to fetch all features
router.get('/get_feature', serviceController.get_feature);
//post request to delete a feature
router.post('/delete_feature', serviceController.delete_feature);
//post request to update a feature
router.post('/update_feature', serviceController.update_feature);

module.exports=router;