import { Injectable } from '@angular/core';
import {HttpClientModule,HttpHeaders, HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  credential:any;
  issue:[];
  id:any;
  constructor(private http : HttpClient) {

   }
   userCredential(data){
     console.log(data);
     this.id=data
     
    //  console.log(id);
    //   this.id= this.credential;
    //   console.log(this.credential);
   }
   issueData(data){
     console.log(data);
     this.issue =data
     console.log(this.issue)
     this.http.post<any>(`${environment.url}/api/issue/createIssue` , this.issue).subscribe((data)=>{
       console.log(data);
     });
   }
}
