const UserService = require('../../services/user/user.service');
const utils = require('../../utils/utils');
const APIError = require('../../constants/APIError');
const sendMail = require('../../services/mail/nodemailer.service');
const { response } = require('express');
const user = require('../../models/user');
//const UserService = require('../../services/user/user.service');
const userService = new UserService();

class UserController {
    constructor() {

    }
    async all_users(req, res, next){
        try{
        console.log('1');
        let response = await userService.all_users();
        res.json(response);
    } catch(err){
        next(err);
    }
    }
    async get_user(req, res, next) {
        try {
            let response = await userService.get_user(req.query.user_id);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }

    async update_users(req, res, next) {
        try{
            let response = await userService.update_users();
            res.json(response);
        } catch (err) {
            next(err)
        }
    }
    async get_user_by_mobile(req, res, next) {
        try {
            let response = await userService.get_user_by_mobile(req.query.mobile);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }

    async get_user_by_email_address(req, res, next) {
        try {
            let response = await userService.get_user_by_email_address(req.query.emailAddress);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }
    async give_user_trial(req, res, next) {
        try {
            console.log("give user trial");
            console.log(req.body)
            if(!utils.hasParams(req.body, ['emailAddress'])) {
                throw APIError.MissingParams;
            }

            let response = await userService.give_user_trial(req.body.emailAddress);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }


    async login(req, res, next) {
        try {
            console.log(req.body);
            if(!utils.hasParams(req.body, ['emailAddress', 'password'])) {
                throw APIError.MissingParams;
            }
            let obj = utils.pick(req.body, ['emailAddress', 'password']);
            console.log("login controller")
            console.log(obj);
            const token = await userService.login(obj);
            res.cookie('token', token);
            res.json(token);
            // if(req.cookies['last_requested']) {
            //     let redirect = req.cookies['last_requested']
            //     //res.clearCookie('last_requested');
            //     res.redirect(redirect);
                
            // }else {
                
            // }
            
        } catch(err) {
            console.log(err);
            next(err);
        }


    }

    async update_users_to_new_product(req, res, next) {
        try {
            const user = await userService.update_users_to_new_product();
            res.json(user)
        } catch (err){
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

    async group_email(req,res, next){
        try{
            console.log('reached user controller')
            console.log(req.body)
            let users = await userService.get_user_by_product_id_for_mail(req);
            // console.log(users);
            let i =0;
            for (i=0 ; i < users.length ; ++i) {
                let email=users[i].emailAddress.toLowerCase();

            sendMail({
                to: email,
                subject: req.body.subject,
                text:req.body.text,
                type: 'custom_group_mail'
            });
            
        }
        res.json('mail sent')
        }

    catch(err) {
            console.log(err);
            next(err);
        }
    }

    async forgot(req,res, next) {
        try {
            if(!utils.hasParams(req.body, ['email'])){
                throw APIError.MissingParams;
            }
            const token = await userService.getUserByEmail(req.body);
            sendMail({
                to: req.body.email,
                token: token,
                type: 'forgot_password'
            });  
            res.json("Successful");                    
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            console.log(req.headers);
            req.body = JSON.parse(JSON.stringify(req.body));
            console.log(req.body);
            if(!utils.hasParams(req.body, ['password'])) {
                throw APIError.MissingParams;
            }

            const user = await userService.resetPassword(req);
            res.redirect('/');
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    async getUserCount(req, res, next) {
        try {
         let count = await userService.getUserCount(req.query);
         console.log("COunt is:",count);
         res.send(count);
        } catch (err) {
            next(err);
        }
    }


    async update_users(req, res, next) {
        try{
            let response = await userService.update_users();
            res.json(response);
        } catch (err) {
            next(err)
        }
    }
    async trim_user_emails(req, res, next) {
        try{
            let response = await userService.trim_users_emails();
            res.json(response);
        } catch (err) {
            next(err)
        }
    }

    async update_product(req, res, next) {
        try {
            if(!utils.hasParams(req.body, ['emailAddress', 'product_name', 'subscriptionDay'])) {
                throw APIError.MissingParams;
            }
            let obj = utils.pick(req.body, ['emailAddress', 'product_name', 'subscriptionDay']); 
            let response = await userService.update_product(obj);
            res.json(response);
        } catch (err) {
            next(err)
        }
    }

    


    async logout(req, res, next) {
        try {
            res.json({token:null});
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
            'address1',
            'address_city',
            'address_state',
            'address_pincode',
            'terms_condition',
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
                    'address1',
                    'address_city',
                    'address_state',
                    'address_pincode',
                    'terms_condition',
                    'password',
                    'cnfPassword',
                    'gender' 
                ]);
            console.log(obj);
            const token = await userService.register(obj);
            console.log(token);
            sendMail({
                to: req.body.emailAddress,
                token: token,
                type:'confirm_email'
            });
            res.json(token);
        } catch(err) {
            console.log(err);
            next(err);
        }

    }
   async get_user_by_product_id(req, res, next){
       console.log('user controller')
       console.log(req.query);
       let response = await userService.get_user_by_product_id(req);
       res.json(response);
       }
   
   async remainder_email(req, res , next){
        console.log(req.body);
        let response = await userService.remainder_email(req);
        res.json(response);
   }    
}

module.exports = UserController;