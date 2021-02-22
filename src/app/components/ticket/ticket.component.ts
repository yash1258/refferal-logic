import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup , FormBuilder ,FormControl} from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { IssueService} from '../../services/issue.service'


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  
  constructor( public dialog: MatDialog, private fb: FormBuilder ,private http:HttpClient , private issue :IssueService) { }
  issueGroup : FormGroup;
  products : [];
  productName:any;
  email:any;

  ngOnInit(): void {
    this.issueInitialize();
    // this.getProducts();
    this.productList();
    
    
    
  }
  issueInitialize() {
    this.issueGroup = this.fb.group({
      
      productName : new FormControl(),
      issueSubject : new FormControl(),
      issueText : new FormControl(),
      reportDate : new Date(),
      email : this.issue.id,
      issueStatus : 'open'
    });
    
  }
 
  productList(){
    this.http.get<any>(`${environment.url}/api/product`).subscribe((data) =>{
      console.log(data);
      this.products=data;
      // console.log(this.products)
      
    })
  }
  issueData(){
    console.log(this.issue.id);
    this.issue.issueData(this.issueGroup.value);
  }
}
