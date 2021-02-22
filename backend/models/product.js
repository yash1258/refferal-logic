const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    subscriptionTime: {
        type: Number,
        required: true
    },
    url:{
        type: String
    },
    description: {
        type:String,
        required:true
    },
    launchable:{
        type:Boolean,
        required:true
    },
    features:[{
        type: String
    }]
});

module.exports = mongoose.model('Product', ProductSchema);