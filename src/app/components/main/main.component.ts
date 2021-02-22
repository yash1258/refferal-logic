import { Component, OnInit, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { PaymentServiceService}  from  '../../services/payment-service.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { faInfoCircle, faTv, faRocket, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InfoComponent} from '../info/info.component';
import { TicketComponent } from '../ticket/ticket.component';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
  api = environment.api;
  token;
  banner = false;
  faInfoCircle = faInfoCircle;
  faTv = faTv;
  faRocket = faRocket;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  public launch:boolean;
  public product:any;

  constructor(
    private router: Router, 
    private http: HttpClient,
    private ngZone: NgZone,
    private paymentservice:PaymentServiceService, 
    private spinner:NgxSpinnerService ,
    private auth: AuthService,
    public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    // this.spinner.show();
    // setTimeout(()=>{
    //   this.spinner.hide();
    // },5000)
   this.token = localStorage.getItem('token');
   this.http.get(`${environment.url}/api/product`).subscribe((response:any)=>{
    console.log(response);
    this.products = response;
    this.products.forEach((data)=>{
      if (data.type == this.tools[0]) {
        this.analysisProducts.push(data);
      } else if(data.type == this.tools[1]) {
        this.toolsProduct.push(data);
      }
    })
  });
  this.fetchUser();
  }

  payWithRazor(product, response, transaction_type) {
    console.log('dhdghdgh');
    console.log(response);
    const options: any = {
      key: environment.razorpay_key,
      amount: product.price*100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: "Xponential", // company name or product name
      description: product.name,  // product description
      image: './assets/asset/X.jpg', // company logo or product image
      order_id: response.order_id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      
      let query ={ 
        params : {
        razorpay_order_id:  response.razorpay_order_id,  
        razorpay_payment_id:  response.razorpay_payment_id,
        razorpay_signature:  response.razorpay_signature,
        razorpay_amount: options.amount,
        razorpay_currency:options.currency
      },
      user_id:this.user._id,
      product_id:product._id,
      expiry:product.subscriptionTime,
      transaction_type: transaction_type
    
    } 
      console.log(query);
      this.VerifyPayment(query);


      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.paymentservice.nativeWindow.Razorpay(options);
    rzp.open();
  }

  VerifyPayment(params){
    this.spinner.show();
     this.paymentservice.verifyOrder(params).subscribe((params) =>{this.spinner.hide();location.reload();console.log('Success')});
  }

  fetchUser() {
    // this.analysisProducts = [];
    // this.toolsProduct = [];
    //this.subscribedAnalysis = [];
    this.spinner.show();
    this.http.get(`${environment.url}/api/user/get-user-by-token`, {}).subscribe((data: any)=>{
      this.user = data;
      console.log(this.user)
      if(this.user.product_subscribed){
        if(Math.ceil((new Date(this.user.product_subscribed.expiry).valueOf() - new Date().valueOf())/(1000*60*60*24))>0) {
          console.log("I was here");
          this.launch = true;
          this.product = this.user.product_subscribed; 
          this.product._id = this.product.product_id._id         
          console.log(this.launch, this.product);
          this.subscribedAnalysis[this.product._id] = {
            expiry: Math.ceil((new Date(this.product.expiry).valueOf() - new Date().valueOf())/(1000*60*60*24))
          };
        } 
      }
      console.log(this.subscribedAnalysis);
      this.spinner.hide();
    });
  }
  clickMe(product, transaction_type:string) {
    //API request to Order Schema
    // this.products.forEach((data)=>{
    //   if (data.type == product_id ){
    //     product=data;
    //   } 
    // })
    //product_id, user_id
    console.log(product);
    let query={
      params :{
        amount: product.price*100,  
        currency: "INR",
        receipt: "su002",
        payment_capture: '1'

      },
      user_id:this.user._id,
      product_id:product._id,
      transaction_type:transaction_type
    }
    this.paymentservice.getOrderId(query).subscribe(response=>{this.payWithRazor(product, response, transaction_type);})

    ///FInalyy this.user ko update kar do;
    
  }

  upgradeProduct() {
    let expiry = this.subscribedAnalysis[this.user.product_subscribed.product_id._id].expiry;
    let lite_product:any = this.toolsProduct.find((tool)=>{
      return tool.name == 'Xponential'
    })
    let pro_product:any = this.toolsProduct.find((tool)=>{
      return tool.name == 'Xponential Plus'
    })

    let remaining_price = Math.ceil((pro_product.price/pro_product.subscriptionTime)*expiry - (lite_product.price/lite_product.subscriptionTime)*expiry);
    console.log(remaining_price);
    if(remaining_price == 0){
      remaining_price+=1;
    }
    let new_product = {...pro_product,...{price: remaining_price}};
    console.log(new_product);
    this.clickMe(new_product, 'UPGRADED');

  }
  doAlert(message) {
    alert(message);
  }

  DummyClick(product_id) {
    console.log(typeof(product_id));
    setTimeout(()=>{
      this.subscribedAnalysis[product_id] = true;
      console.log(this.subscribedAnalysis);
    },3000)
    
  }

  redirect() {
    this.http.get(`${environment.url}/redirect/`,{}).subscribe((data)=>{

    });
  }
  logout(){
    this.http.post(`${environment.url}/api/user/logout`,{}).subscribe((res)=>{
          console.log('fyfyy');
          console.log(res[0]);
          localStorage.setItem('token', res[0]);
          localStorage.removeItem("token");
          this.router.navigate(['']);
          // localStorage.removeItem('token')
          // console.log(localStorage.getItem('token'));
          // this.valid_user =false;
          // this.auth.setAuthentication(res[0]);
          
    });
  }
  profile(){
    
  }

  info(data) {
    this.dialog.open(InfoComponent, {
      data: data
    })
  }
  reportIssue(){
    this.dialog.open(TicketComponent)
  }

}
