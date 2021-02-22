const TransactionService = require('../../services/payment/transaction.service');
const utils = require('../../utils/utils');
const APIError = require('../../constants/APIError');
let transactionService = new TransactionService();

class TransactionController {
    constructor() {

    }


    // async filter_by_date(req, res, next) {
    //     try {
    //         console.log('filter called')
    //         console.log(req.body)
    //         if (!utils.hasParams(req.query, ['from_date', 'to_date'])){
    //             throw APIError.MissingParams;
    //         }
    //         let request = utils.pick(req.query, ['from_date', 'to_date']);
    //         let response = await transactionService.filter_by_date(request);
    //         res.json(response);
    //     } catch (err) {
    //         next(err);
    //     }

    // }

    async filter_by_date(req, res ,next){
        console.log(req.query)
        let response = await transactionService.filter_by_date(req)
        console.log(response)       
        res.json(response);
    }

    async fix_date_of_transaction(req, res, next) {
        try {
            let response = await transactionService.fix_date_of_transaction();
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
    async transaction_detail(req, res, next){
        let response = await transactionService.transaction_detail();
        console.log(response);
        res.json(response); 
    }

    async fix_transaction_db_with_new_product(req, res, next) {
        try {
            let response = await transactionService.fix_transaction_db_with_new_product();
            res.send(response);
        } catch (err) {
            next(err);
        }
    }



}

module.exports = TransactionController;