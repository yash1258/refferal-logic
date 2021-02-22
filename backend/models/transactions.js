const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product_price:{
        type:Number
    },
    invoice_number:{
        type:String
    },
    date_of_invoice:{
        type: Date,
        required: true
    },
    type: {
        type: String,
        default: "NEW",
        enum: ['NEW', 'EXTEND_LICENCE', 'UPGRADED']

    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Transactions', TransactionSchema);