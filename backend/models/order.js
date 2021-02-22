const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
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
    status: {
        type: String,
        enum: ['CREATED', 'VERIFIED', 'CAPTURED'],
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);