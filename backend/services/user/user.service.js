const model = require('../../models/user');
const product_model = require('../../models/product');
const APIError = require('../../constants/APIError');
const AuthMiddleware = require('../../middlewares/auth/auth');
const bcrypt = require('bcrypt');
const authMiddleware = new AuthMiddleware();
const sendMail = require('../../services/mail/nodemailer.service');

class UserService {
    constructor() {
        this.getUserByToken = this.getUserByToken.bind(this);
    }
    async all_users(){
        console.log('2');
        let users = await model.find({});
        return users;
    }

    async get_user(request) {
        let user = await model.findById(request, {password: 0});
        return user;
    }
    async get_user_by_mobile(request) {
        let user = await model.findOne({mobileNumber:request}, {password: 0});
        return user;
    }

    async get_user_by_email_address(request) {
        let user = await model.findOne({emailAddress:request}, {password: 0});
        return user;
    }
    
    async give_user_trial(request) {
        let user = await model.findOne({emailAddress: request});
        if(!user) {
            throw APIError.InvalidCredentials;
        }
        
        user.products= [];
        await user.save();
        let products_list = await product_model.find({});
        for(let product of products_list){
            let obj={
                product_id:product._id,
                expiry:product.expiry,
                user_id:user._id
            }
          let abc = await this.set_products_for_user(obj);
        }
        user = await model.findOne({emailAddress: request});
        let response = user;
        return response;
        
    }

    async get_user_by_product_id(request){
        
        let current_date = new Date();
        console.log(current_date)
        console.log(request.query.product_id)
        let users = await model.find({$and:[{'products.product_id': request.query.product_id} , {'products.expiry' : {$gte: current_date } }]});
        console.log(users);
        return users;
    }
    async get_user_by_product_id_for_mail(request){
        
        let current_date = new Date();
        console.log(current_date)
        console.log(request.body)
        let users = await model.find({$and:[{'products.product_id': request.body.product_id} , {'products.expiry' : {$gte: current_date } }]});
        console.log('users');
        return users;
    }

    // async get_features_of_subscribed(request) {

    // }

    async login(request) {
        console.log("login user service");
        console.log(request.emailAddress)
        let emailAddress=request.emailAddress.trim().toUpperCase();
        let user;
        if(parseInt(request.emailAddress)){
            user = await model.findOne({mobileNumber:emailAddress});
            console.log("I was here");
        } else {
            user = await model.findOne({emailAddress: emailAddress});
        }
        
        if(!user){
            throw APIError.UserNotFound;
        } 
        let valid_password = await bcrypt.compare(request.password, user.password);
        if(!valid_password) {
            throw APIError.InvalidCredentials;
        } 
        let email = user.emailAddress;
        let token = await authMiddleware.createToken({emailAddress:email});
        return token;
    }

    async register(request) {
        console.log('dhfgjhr');
        console.log(request);
        request.emailAddress = request.emailAddress.trim().toUpperCase();
        let user = await model.findOne({emailAddress: request.emailAddress});
        if(user) {
            throw APIError.UserAlreadyExist;
        }   
        console.log('request from user register');
        console.log(request);
        let count = await model.find({}).countDocuments();
        
        request.password = await bcrypt.hash(request.password, 8);
        request = {...{id : count+1}, ...request};
        let registeration = new model(request);
        let response = await registeration.save();
        console.log(response);
        let token = await authMiddleware.createToken({emailAddress: request.emailAddress});
        console.log(token);
        return token;
    }

    async getUserByToken(token) {
        let id = await authMiddleware.parseToken(token);
        console.log("id is printed here");
        console.log(id);
        let user = await model.findOne({emailAddress:id.emailAddress.trim().toUpperCase()}, {password: 0}).populate('product_subscribed.product_id');
        console.log(user);
        return user;
    }
    async set_products_for_user(request){
        let product_id = request.product_id;
        //let expiry = new Date(new Date().getTime()+request.expiry*24*60*60*1000);
        // let obj = {
        //     product_id:product_id,
        //     expiry:expiry
        // }
        let user_id =request.user_id;
        let filter ={ _id:user_id};

        let user = await model.findOne(filter);
        if(!user){
            throw 'User not found'
        } else {
            if(request.transaction_type == 'NEW') {
                user.product_subscribed = {product_id: product_id, expiry: Date.now() + request.expiry*24*60*60*1000}
            } else if (request.transaction_type == 'EXTEND_LICENCE') {
                console.log("I was here");
                user.product_subscribed.expiry =  new Date(user.product_subscribed.expiry).valueOf() + request.expiry*24*60*60*1000 
            } else if (request.transaction_type == 'UPGRADED') {
                console.log("I was here in upgraded");
                user.product_subscribed.product_id = product_id;
            }
            let response = await user.save()
    return response;
        }
    }

    async resetPassword(request) {
        try{
            console.log("header token")
            console.log(request.headers['token']);
            let user = await this.getUserByToken(request.headers['token']);
        if(!user) {
            throw APIError.InvalidCredentials;
        }
        user.password = await bcrypt.hash(request.body.password, 8);
        let response = await user.save();
        return response;
        }
        catch(err){
            console.log(err)
        }
    }

    async update_users() {
        let user = await model.find({$or:[{products:{$size:1}},{products:{$size:2}}]},{password:0}); 
        for(let i=0;i<user.length;i++) {
            for(let j=0;j<user[i]['products'].length;j++){
                user[i]['products'][j]['expiry'] = new Date(2020, 10, new Date(user[i]['products'][j]['expiry']).getDate()).valueOf() + 4*24*60*60*1000; 
                await user[i].save()
            }
        }
        console.log(user);
        
        return user;
    }

    async trim_users_emails() {
        let user = await model.find({}); 
        for(let i=0;i<user.length;i++) {
            user[i]['emailAddress']=user[i]['emailAddress'].trim().toUpperCase();
            user[i].save();
        }
        console.log(user);
        return user;
    }

    async update_users_to_new_product(request) {
        // Find all users iterate through it
        // If user of XFlip Basic convert to Xpo-Lite
        // If user of Xflip Pro & X-Straddle convert to Xpo-Pro
        // 
        let product= await product_model.find({})
        // console.log(product_lite);
        let xflip_options = product.find((data)=>{
            return data.name == 'XFlip Options'
        })
        let xflip_pro = product.find((data)=>{
            return data.name == 'XFlip Options Pro'
        })
        let xstraddle = product.find((data)=>{
            return data.name == 'X-Straddle'
        })
        let xpo_lite = product.find((data)=>{
            return data.name == 'Xponential'
        })
        let xpo_pro = product.find((data)=>{
            return data.name == 'Xponential Plus'
        })
        console.log(xpo_pro);
        
        // let product_pro = await product_model.findOne({name:'Xpo-Lite'},{_id:1})
        // console.log(product_pro);
        // return product_lite;
        let user = await model.find({})
        // console.log(user);
        //return xflip_options;
        for(let i=0;i<user.length;i++) {
            // user[i]['product_subscribed'] ={};
            for(let j=0;j<user[i].products.length;j++) {
                // console.log(user[i]['products'][j]['product_id']);
                if (String(user[i]['products'][j]['product_id']) == String(xstraddle._id) || String(user[i]['products'][j]['product_id']) == String(xflip_pro._id)) {
                    user[i]['product_subscribed'] = {
                        product_id: xpo_pro._id,
                        expiry : user[i]['products'][j]['expiry']
                    }
                    // console.log("I was here");
                    // console.log(xpo_pro._id);
                    // console.log(user[i]['product_subscribed'])
                    // console.log(user[i])
                   break; 
                }
                else if (String(user[i]['products'][j]['product_id']) == String(xflip_options._id)) {
                    user[i]['product_subscribed'] = {
                        product_id: xpo_lite._id,
                        expiry : user[i]['products'][j]['expiry']
                    }
                    // console.log("I was here");
                    // console.log(xpo_lite._id);
                    // console.log(user[i]['product_subscribed'])
                    
                }
            }
            await user[i].save();
        }

        return user;
        
    }

    async update_product(request) {
        let product = await product_model.findOne({name: request.product_name})
        console.log("I am here");
        if(!product) {
            throw APIError.MissingProduct
        } 
        let user = await model.findOne({emailAddress: request.emailAddress.trim().toUpperCase()},{password:0});
        if(!user) {
            throw APIError.UserNotFound;
        }
        // if(product.name == 'X-Straddle') {
        //     user.products.push({product_id: product._id, expiry: new Date('2020-11-15').valueOf() + product.subscriptionTime*24*60*60*1000});
        //     await user.save()
        //     return user;
        // } 
        let user_product = await model.findOne({emailAddress: request.emailAddress.trim().toUpperCase(), 'products.product_id': product._id},{password:0});
        console.log("User product:",user_product);
        if(user_product) {
            for (let i=0;i<user_product.products.length;i++) {
                console.log("I am working");
                console.log(String(user_product.products[i]['product_id']) == String(product._id));
                if(String(user_product.products[i]['product_id']) == String(product._id)) {
                    user_product.products[i]['expiry'] = new Date(request.subscriptionDay).valueOf() + product.subscriptionTime*24*60*60*1000; 
                }
            }
            await user_product.save();
            return user_product;
        } else {
            user.products.push({product_id: product._id, expiry: new Date(request.subscriptionDay).valueOf() + product.subscriptionTime*24*60*60*1000});
            await user.save()
            return user;
        } 
    }
    

    async confirm_email(request) {
        let user = await this.getUserByToken(request);
        if(! user) {
            throw APIError.InvalidCredentials;
        }
        user.confirm_email = true;
        let response = await user.save()
        return response;
    }


    async getUserCount(request) {
        console.log("Request is",request)
        let product = await product_model.findOne({name: request.name});
        console.log("Product is:",product);
        if(product) {
            let count = await model.find({'products.product_id':product._id}).count();
            return {count:count};
        } else {
            throw APIError.EntityNotFound
        }
    }

    async getUserByEmail(request) {
        console.log("This line is of staging");
        console.log("After merge");
        console.log("Changed something in feature branch")
        console.log(request);
        let user = await model.findOne({emailAddress: request.email.trim().toUpperCase()});
        if(!user) {
            throw APIError.InvalidCredentials;
        } else {
            let token = await authMiddleware.createToken({emailAddress: request.email.trim().toUpperCase()});
            return token; 
        }
    }

    async remainder_email(req){
        console.log(req.body.emailAddress);
        let user =  await model.findOne({emailAddress : req.body.emailAddress})
        console.log(user);
        let expiry = user.products[0].expiry;
        console.log(expiry);
        let newDate = new Date();
        let days = Math.floor((expiry - newDate)/86400000);
        console.log(days);
        if( days < 2 && days > 0){
            console.log('expiring Soon')
            sendMail({
                to: req.body.emailAddress,
                subject: `Your Subscription is expiring`,
                text:`Respected, your subscription is expiring. Please renew. Thanks`,
                type: 'subscription_remainder'
            });
        } else {
            console.log('no need to send mail')
        }
        return days
    }
}

module.exports = UserService;
