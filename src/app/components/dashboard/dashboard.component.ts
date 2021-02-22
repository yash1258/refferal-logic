import { Component, OnInit, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { PaymentServiceService}  from  '../../services/payment-service.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products:any[] = [];
  user:any;
  order_id:any;
  amount:any;
  paymentId:any;
  paymentSignature:any;
  tools = ['Xpo-Analytics', 'Xpo-Tools']
  analysisProducts = [];
  toolsProduct = [];
  userSubscribedProducts = [];
  subscribedAnalysis = [];
  //api = environment.api;
  token;
  constructor(
    private router: Router, 
    private http: HttpClient,
    private paymentservice:PaymentServiceService, 
    private ngZone: NgZone, 
    private auth: AuthService) { }

  ngOnInit(): void {
  //  this.token = this.auth.getAuthentication();

  //  this.token = localStorage.getItem('token');
  //  this.http.get(`${environment.url}/api/product`).subscribe((response:any)=>{
  //   console.log(response);
  //   this.products = response;
  //   this.products.forEach((data)=>{
  //     if (data.type == this.tools[0]) {
  //       this.analysisProducts.push(data);
  //     } else if(data.type == this.tools[1]) {
  //       this.toolsProduct.push(data);
  //     }
  //   })
  // });
  // this.fetchUser();
  }

  // payWithRazor(product,response) {
  //   console.log('dhdghdgh');
  //   console.log(response);
  //   const options: any = {
  //     key: environment.razorpay_key,
  //     amount: product.price*100, // amount should be in paise format to display Rs 1255 without decimal point
  //     currency: 'INR',
  //     name: "Xponential", // company name or product name
  //     description: product.name,  // product description
  //     image: './assets/asset/X.jpg', // company logo or product image
  //     order_id: response.order_id, // order_id created by you in backend
  //     modal: {
  //       // We should prevent closing of the form when esc key is pressed.
  //       escape: false,
  //     },
  //     notes: {
  //       // include notes if any
  //     },
  //     theme: {
  //       color: '#0c238a'
  //     }
  //   };
  //   options.handler = ((response, error) => {
      
  //     let query ={ 
  //       params : {
  //       razorpay_order_id:  response.razorpay_order_id,  
  //       razorpay_payment_id:  response.razorpay_payment_id,
  //       razorpay_signature:  response.razorpay_signature,
  //       razorpay_amount: options.amount,
  //       razorpay_currency:options.currency
  //     },
  //     user_id:this.user._id,
  //     product_id:product._id,
  //     expiry:product.subscriptionTime
    
  //   } 
  //     console.log(query);
  //     this.VerifyPayment(query);


  //     // call your backend api to verify payment signature & capture transaction
  //   });
  //   options.modal.ondismiss = (() => {
  //     // handle the case when user closes the form while transaction is in progress
  //     console.log('Transaction cancelled.');
  //   });
  //   const rzp = new this.paymentservice.nativeWindow.Razorpay(options);
  //   rzp.open();
  // }
  // VerifyPayment(params){
    
  //    this.paymentservice.verifyOrder(params).subscribe((params) =>{this.fetchUser();console.log('Success')});

  // }

  // fetchUser() {
  //   // this.analysisProducts = [];
  //   // this.toolsProduct = [];
  //   //this.subscribedAnalysis = [];
  //   this.http.get(`${environment.url}/api/user/get-user-by-token`, {}).subscribe((data: any)=>{
  //     this.user = data;
  //     console.log(this.user)
  //     this.user.products.forEach((product)=>{
  //       console.log(typeof(product.product_id));
  //       if(new Date(product.expiry).valueOf()>(new Date()).valueOf()){
  //         this.ngZone.run(()=>{
  //           this.subscribedAnalysis[product.product_id] = true;
  //         });
  //       }
  //     });
  //     console.log(this.subscribedAnalysis);
  //   });
  // }
  // clickMe(product) {
  //   //API request to Order Schema
  //   // this.products.forEach((data)=>{
  //   //   if (data.type == product_id ){
  //   //     product=data;
  //   //   } 
  //   // })
  //   //product_id, user_id
  //   let query={
  //     params :{
  //       amount: product.price*100,  
  //       currency: "INR",
  //       receipt: "su002",
  //       payment_capture: '1'

  //     },
  //     user_id:this.user._id,
  //     product_id:product._id
  //   }
  //   this.paymentservice.getOrderId(query).subscribe(response=>{this.payWithRazor(product,response);})

  //   ///FInalyy this.user ko update kar do;
    
  // }
  // doAlert(message) {
  //   alert(message);
  // }

  // DummyClick(product_id) {
  //   console.log(typeof(product_id));
  //   setTimeout(()=>{
  //     this.subscribedAnalysis[product_id] = true;
  //     console.log(this.subscribedAnalysis);
  //   },3000)
    
  // }

  // redirect() {
  //   this.http.get(`${environment.url}/redirect/`,{}).subscribe((data)=>{

  //   });
  // }
  // logout(){
  //   this.http.post(`${environment.url}/api/user/logout`,{}).subscribe((res)=>{
  //         console.log('fyfyy');
  //         console.log(res[0]);
  //         localStorage.setItem('token', res[0]);
  //         localStorage.removeItem("token");
  //         this.router.navigate(['']);
  //         // localStorage.removeItem('token')
  //         // console.log(localStorage.getItem('token'));
  //         // this.valid_user =false;
  //         // this.auth.setAuthentication(res[0]);
          
  //   });
  // }
  // profile(){
    
  // }

}
