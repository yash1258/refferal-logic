import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  data:string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.emailForm = this.fb.group({
      'email': ''
    })
  }

  submitForm() {
    this.http.post(`${environment.url}/api/user/forgot_password`,{
      email: this.emailForm.value.email
    }).subscribe(
      (data)=>{
      console.log(data);
      this.data = 'Please check your mail for password link';
    },(err)=>{
      console.log(err);
      this.data = 'Looks like email is not correct';
    })
  }

}
