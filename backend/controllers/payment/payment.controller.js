 
const PaymentService = require('../../services/payment/payment.service');
const utils = require('../../utils/utils');
const APIError = require('../../constants/APIError');
const Razorpay=require("razorpay");
const paymentservice = new PaymentService();
const UserService = require('../../services/user/user.service');
const userService = new UserService();
let config = require('config');
const crypto = require("crypto");
//const userService = new UserService();
let instance = new Razorpay({
    key_id: config.get('RAZORPAY_KEY'),
    key_secret:  config.get('RAZORPAY_SECRET') 
  });

class PaymentController {
    constructor() {

    }
    async get_user_transactions(req, res, next){
        try {
            console.log(req.body);
            if(!utils.hasParams(req.body, ['emailAddress'])) {
                throw APIError.MissingParams;
            }
            let response = await paymentservice.get_user_transactions(req.body);
            console.log(response);
            res.json(response);

        } catch(err) {
            console.log(err);
            next(err);
        }
    }
    async get_order_id(req, res, next) {
        try {
            console.log(req.body);
            if(!utils.hasParams(req.body.params, ['amount', 'currency', 'receipt', 'payment_capture'])) {
                throw APIError.MissingParams;
            }
            let temp_order_id = await instance.orders.create(req.body.params);
            console.log(temp_order_id);
            console.log(req.body.user_id);
            console.log(req.body.product_id);
            let obj = {order_id:temp_order_id.id,user_id:req.body.user_id,product_id:req.body.product_id};
            let response = await paymentservice.create_order(obj);
            console.log(response);
            res.json(response);

        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    async verify_order(req, res, next) {
        try {
            let body=req.body.params.razorpay_order_id + "|" + req.body.params.razorpay_payment_id;
            let expectedSignature = crypto.createHmac('sha256', instance.key_secret).update(body.toString()).digest('hex');
            console.log("sig"+req.body.params.razorpay_signature);
            console.log("sig"+expectedSignature);
            console.log(req.body);
            console.log("sig"+req.body.params.razorpay_signature);
            let response1 =  {"status":"failure"}
            if(expectedSignature === req.body.params.razorpay_signature) {
                response1={"status":"success"}
                let transaction_response = paymentservice.record_transaction_details(req.body);
                let response = await paymentservice.change_order_status(req.body);
                console.log(response);
                console.log(transaction_response);
                //let data = await instance.payments.capture(req.body.params.razorpay_payment_id, req.body.params.razorpay_amount, req.body.params.razorpay_currency);
                let user = await userService.set_products_for_user(req.body);
                res.success('SUCCESS');
            }
        } 
        catch(err) {
            console.log(err);
            next(err);
        }

    }

    async getUserByToken(req, res, next) {
        try {
            console.log(req.headers);
            if(!utils.hasParams(req.headers, ['token'])) {
                throw APIError.MissingParams;
            }
            let obj = utils.pick(req.headers, ['token']);
            const user = await userService.getUserByToken(req.headers.token);
            res.json(user);
        } catch(err) {
            next(err);
        }
    }


    async logout(req, res, next) {
        try {
            res.send({token:null});
        } catch(err) {
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            if(!utils.hasParams(req.body, 
            [ 
            'firstName',
            'lastName',
            'emailAddress',
            'mobileNumber',
            'password',
            'cnfPassword',
            'gender'
            ]
            )) {
                throw APIError.MissingParams;
            }
            let obj = utils.pick(req.body, 
                [ 
                    'firstName',
                    'lastName',
                    'emailAddress',
                    'mobileNumber',
                    'password',
                    'cnfPassword',
                    'gender' 
                ]);
                console.log(obj);
            
            const response = await userService.register(obj);
            console.log(response);
            res.json(response);
        } catch(err) {
            console.log(err);
            next(err);
        }

    }
    async transaction_detail(){
        
    }

}

module.exports = PaymentController;