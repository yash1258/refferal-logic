const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    address1: {
        type: String
    },
    address_city: {
        type: String
    },
    address_state: {
        type: String
    },
    address_pincode: {
        type: String
    },
    terms_condition:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    confirm_email :{
        type: Boolean,
        default: false
    },
    mobileNumber: {
        type: Number
    },
    product_subscribed: {
        product_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        expiry:{
            type: Date, 
        }
    },
    products:[{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        expiry: {
            type: Date,
            required: true
        },
    }]
});

module.exports = mongoose.model('User', UserSchema);