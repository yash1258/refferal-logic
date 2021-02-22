
const express = require("express");
const app = express();
const Razorpay=require("razorpay");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoute = require('./routes/user/user.route');
const productRoute = require('./routes/product/product.route');
const paymentRoute = require('./routes/payment/payment.route.js');
const transactionRoute = require('./routes/payment/transaction.route');
const issueRoute =require('./routes/issue/issue.route')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const AuthController = require('./middlewares/auth/auth');
let auth = new AuthController();
const UserService = require('./services/user/user.service')
let userService = new UserService();
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
const config = require('config')
const errorHandler = require('./middlewares/handlers/errorHandler');
const responseHandler = require('./middlewares/handlers/responseHandler');
// require('dotenv').config({});
console.log(config.get('NODE_ENV'));
console.log(config.get('MAIL_AUTH.user'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use('/web', express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true,useUnifiedTopology: true}).then((data)=>{
  console.log("Database successfully connected");
}).catch((err)=>{
    console.log(err.message);
    console.log("Please connect database!!");
});

app.use(responseHandler);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/issue', issueRoute)
app.use('/api/transaction', transactionRoute);
app.get('/api/resetpassword',async (req ,res, next)=>{
  try{
    if(!req.query.token){
      res.render('invalid_token' ,{data:'Looks like this request is not authenticated'});
    } 
    else {
      let verification = await jwt.verify(req.query.token, config.get('JWT_SECRET'));
      if(!verification) {
        res.render('invalid_token' ,{data:'Looks like this request is not correct'});
      } else {
        res.render('change_password', {token:req.query.token});
      }
    }
  } catch (err) {
    console.log(err);
    res.render('invalid_token' ,{data:'Something is wrong, Please contact administrator'});
    // next(err);
  }
})
app.get('/api/confirm/email', async (req, res, next) =>{
  try{
    if(!req.query.token){
      res.render('invalid_token' ,{data:'Looks like this request is not authenticated'});
    } 
    else {
      let verification = await jwt.verify(req.query.token, config.get('JWT_SECRET'));
      if(!verification) {
        res.render('invalid_token' ,{data:'Looks like this request is not correct'});
      } else {
        let response = await userService.confirm_email(req.query.token);
        res.render('confirm_email');
      }
    }
  } catch (err) {
    console.log(err);
    res.render('invalid_token' ,{data:'Something is wrong, Please contact administrator'});
  }
})
app.use("/api/payment",paymentRoute);
app.use(express.static(__dirname));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/app/', express.static(path.join(__dirname,'../dist/super-dashboard')));

app.get('/' ,(req, res, next)=>{
  res.render('landing_page');
})
app.get('/terms_condition', (req, res, next)=>{
  res.render('terms_condition')
})
app.get('/x-straddle-launch-soon', (req,res,next)=>{
  res.render('launch_x_straddle');
});

app.get('/invalid_token', (req,res,next)=>{
  res.render('no_token')
});

app.get('/app/*', (req,res, next)=>{
  res.sendFile(path.join(__dirname, '../dist/super-dashboard/index.html'));
});


// app.get('/register', (req,res, next)=>{
//   res.sendFile(path.join(__dirname, '../dist/super-dashboard/index.html'));
// });

// app.get('/dashboard', (req,res, next)=>{
//   res.sendFile(path.join(__dirname, '../dist/super-dashboard/index.html'));
// });


app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen("3002",()=>{
    console.log("server running at port 3002");
});