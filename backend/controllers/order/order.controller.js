




class OrderController {
    constructor() {

    }

    async get_orders(req, res, next) {
        try {
            let response = await model.find({});
            console.log(response);
            res.send(response);
        } 
        catch(err) {
            console.log(err);
        }
    }
    async create_order(req, res, next) {
        try {
            //req.body.product_id, req.body.user_id 
            //order_id creation
            //At first create status - 'CREATED'
            //THen once verified - change status to VERIFIED
            //Once captured - change status to CAPTURED
            //User model call karke 
            //baaki details..
            //products ke schema me product_id, expiry push karke save kardo
            //response return user document
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports= OrderController;