import { Injectable } from '@angular/core';
import {HttpClientModule,HttpHeaders, HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

function _window(): any {
  // return the global native browser window object
  return window;
}
const xhttpOptions ={
  headers : new HttpHeaders({



    
  'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  orderIdURL:string = `${environment.url}/api/payment/order`;
  verifyURL:string = `${environment.url}/api/payment/verify`;

  constructor(private http:HttpClient) { }

  getOrderId(params):Observable<any>{
    return this.http.post<any>(this.orderIdURL,params,xhttpOptions);
  }
  get nativeWindow(): any {
    return _window();
  }
  verifyOrder(params):Observable<any>{
    return this.http.post<any>(this.verifyURL,params,xhttpOptions);
  }

}
