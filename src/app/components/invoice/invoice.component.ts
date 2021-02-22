import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor( private http: HttpClient) { }
  transactions:any[] = [];
  user:any;
  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser() {
    // this.analysisProducts = [];
    // this.toolsProduct = [];
    //this.subscribedAnalysis = [];
    this.http.get(`${environment.url}/api/user/get-user-by-token`, {}).subscribe((data: any)=>{
      this.user = data;
      console.log(this.user)
      this.http.post(`${environment.url}/api/payment/fetch-transactions`, {"emailAddress":this.user.emailAddress}).subscribe((tdata:any)=>{
        this.transactions=tdata;
      })
    });
  }

}
