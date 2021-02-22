let model = require('../../models/transactions')
let product_model = require('../../models/product');
const APIError = require('../../constants/APIError');
const { analyzeAndValidateNgModules } = require('@angular/compiler');



class TransactionService {
    
    constructor() {

    }

    async filter_by_date(request) {

        console.log('trans service called');
        // console.log(request);
       
        let invoicedate= model.find({}) ;
        
        
        // console.log(invoicedate);
        console.log(new Date(request.query.from_date));
        console.log(new Date(request.query.to_date));
        // let transaction= await this.model.filter(f => new Date(f.date) > request.from_date && new Date(f.date) < request.to_date)
        let transactions = await model.find({date_of_invoice: {$gte: new Date(request.query.from_date) , $lt: new Date(request.query.to_date)}});
        console.log(transactions);
        return transactions;
    }

    async fix_date_of_transaction() {
        let transactions = await model.find({})
        console.log(transactions);
        for (let i=0;i < transactions.length; i++) {
            transactions[i]['date_of_invoice'] = (new Date(transactions[i]['date_of_invoice'])).valueOf();
            console.log(transactions[i]);
            await transactions[i].save()
        }
        let data = await model.find({});
        return data;
    }
    async transaction_detail(){
        let transactions = await model.find({})
        console.log(transactions);
        return transactions;
    }
    async fix_transaction_db_with_new_product() {
        // let xpo_plus = await product_model.findOne({name:'Xponential Plus'})
        // let xpo = await product_model.findOne({name:'Xponential'})
        let transaction_arr = await model.find({});
        for(let i=0;i<transaction_arr.length;i++) {
            if(transaction_arr[i].product_name && transaction_arr[i].product_name == 'XFlip Options') {
                transaction_arr[i].product_name = 'Xponential'
            } else if ((transaction_arr[i].product_name && transaction_arr[i].product_name == 'XFlip Options Pro') || (transaction_arr[i].product_name && transaction_arr[i].product_name == 'X-Straddle')){
                transaction_arr[i].product_name = 'Xponential Plus' 
            }
            await transaction_arr[i].save()
        }
        return transaction_arr;
    }
   

}

module.exports = TransactionService;


