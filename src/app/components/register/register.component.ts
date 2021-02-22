import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../../services/userauth.service'
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  valid_user: boolean = true;
  registerSubscribe: any;
  fnamePattern = "^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)";
  lnamePattern = "^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)";
  mobilePattern = "[6-9]\\d{9}";
  emailPattern = "[a-zA-Z][a-zA-Z0-9_.]{1,}[@][a-zA-Z0-9]{1,}[.][a-zA-Z]";
  passwordPattern = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$";

  constructor(private fb: FormBuilder, private http: UserauthService, private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {

    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      emailAddress: ['', [Validators.required,Validators.email]],
      address1 : ['', [Validators.required]],
      address_city : ['', [Validators.required]],
      address_state : ['', [Validators.required]],
      address_pincode : ['', [Validators.required,Validators.pattern('^[1-9]+[0-9]{5}$')]],
      mobileNumber:['', [Validators.required,Validators.pattern(this.mobilePattern)]],
      password : ['', [Validators.required,Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required,Validators.minLength(6)]],
      gender:['',Validators.required],
      terms_condition: [false, Validators.required]
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('cnfPassword').value;
  
  return (pass === confirmPass) && pass!==''     
 }
  register() {
    // if(this.checkPasswords(this.registerForm)){

    // } 
    console.log(this.registerForm);
    this.http.registerUser(this.registerForm.value).subscribe(
      (response:string)=>{
          console.log('fyfyy');
          console.log(response);
          localStorage.setItem('token', response);
          console.log(localStorage.getItem('token'));
          this.valid_user = true;
          this.auth.setAuthentication(response);
          this.router.navigate(['dashboard']);
    },
    (err)=>{
      console.log(err);
      
    });
  }
}
