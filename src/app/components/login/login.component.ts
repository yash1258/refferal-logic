import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../../services/userauth.service';
import { AuthService} from '../../services/auth.service';
import { IssueService} from '../../services/issue.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;
  valid_user: boolean = true;
  message = 'Username or Password is wrong';
  constructor(private fb: FormBuilder, private http: UserauthService, private router: Router,private auth:AuthService ,private issue: IssueService) { }

  ngOnInit(): void {
    this.initializeForm();
    
  }
  initializeForm() {
    this.loginGroup = this.fb.group({
      
      emailAddress: ['', Validators.required],
      password : ['', Validators.required],
      
    });
  } 


  login(){
    //console.log(this.loginGroup.value)
    this.http.getUserLogin(this.loginGroup.value).subscribe(
      (response: any)=>{
        console.log("rdddtyty");
        console.log(response);
        localStorage.setItem('token', response);
        console.log(localStorage.getItem('token'));
        if(response){
          this.valid_user = true;
        this.auth.setAuthentication(response);
        
        this.router.navigate(['dashboard']);
        
        
        } 
        else{
          this.valid_user = false;
          // this.router.navigate(['']);
        }
        
    },
    (error)=>{
      console.log(error);
      this.valid_user = false;
    })
    this.userCredential();
}
userCredential(){
  console.log('jjj');
  console.log(this.loginGroup.value.emailAddress);
  this.issue.userCredential(this.loginGroup.value.emailAddress);
}

subscriptionRemainder(){
  let user = this.loginGroup.value.emailAddress;
  
}

}
