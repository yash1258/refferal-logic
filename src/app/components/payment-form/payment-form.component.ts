import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaymentServiceService}  from  '../../services/payment-service.service';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  
  order_id:any;
  amount:any;
  paymentId:any;
  paymentSignature:any;
  params ={
    amount: 0,  
    currency: "INR",
    receipt: "su001", 
    payment_capture: '1'
  };
  paymentProfileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    }),
    paymentDetails: new FormGroup({
      productDetails: new FormControl(''),
      Amount: new FormControl(''),
    })
  });
  constructor(private paymentservive:PaymentServiceService) { }

  ngOnInit(): void {
  }
  onSubmit(){
       this.params.amount=this.paymentProfileForm.get(['paymentDetails','Amount']).value;
       var param=this.params;
       
       this.paymentservive.getOrderId(param).subscribe(param => {
        this.order_id =param.sub.id;
        this.amount=param.sub.amount;
        console.log(this.order_id);
        console.log(param)});
       //console.log(this.paymentProfileForm.get(['paymentDetails','Amount']).value);
  }
  payWithRazor() {
    console.log('dhdghdgh');
    const options: any = {
      key: 'rzp_test_QcAnckR9OpdUpt',
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/asset/X.jpg', // company logo or product image
      order_id: this.order_id, // order_id created by you in backend
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
      options.response = response;
      this.paymentId=response.razorpay_payment_id;
      this.paymentSignature=response.razorpay_signature;
      console.log(response);
      console.log(options);
      console.log(response.razorpay_payment_id);
      console.log(response.razorpay_signature);

      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.paymentservive.nativeWindow.Razorpay(options);
    rzp.open();
  }
  VerifyPayment(){
    var params = {
      razorpay_order_id:  this.order_id,  
      razorpay_payment_id:  this.paymentId,
      razorpay_signature:  this.paymentSignature
    };
    this.paymentservive.verifyOrder(params).subscribe(params =>{window.alert(params.status)});

  }

}
