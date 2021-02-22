// const mongoose = require('mongoose');
// const ProductSchema = new mongoose.Schema({
//     productType: {
//         type: String,
//         required: true
//     },
//     productName: {
//         type: String,
//         required: true
//     },
//     productPrice: {
//         type: Number,
//         required: true
//     },
//     subscriptionTime: {
//         type: Number,
//         required: true
//     }
// });
// var connection = mongoose.createConnection('mongodb://localhost:27017/',{useNewUrlParser: true,useUnifiedTopology: true});

// var Product = connection.model('Product', ProductSchema);

// var XponentialBasic = new Product({
//     productType : 'Xpo Analysis',
//     productName: 'Xponential -basic',
//     productPrice: 2000,
//     subscriptionTime:30
// })
// var XflipOptions = new Product({
//     productType : 'Xpo Tools',
//     productName: 'Xflip Options',
//     productPrice: 2500,
//     subscriptionTime:30
// })
// var XflipFutures = new Product({
//     productType : 'Xpo Tools',
//     productName: 'Xflip Options',
//     productPrice: 2500,
//     subscriptionTime:30
// })

// XponentialBasic.save(function (err,results) {
//     if (err) console.log(err);
//     else console.log(results)
//     // saved!
//   });
// XflipOptions.save(function (err,results) {
//     if (err) console.log(err);
//     else console.log(results)
//     // saved!
//   });
// XflipFutures.save(function (err,results) {
//     if (err) console.log(err);
//     else console.log(results)
//     // saved!
// });














