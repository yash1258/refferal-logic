import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean;
  token;

  constructor(private http: HttpClient) {

   }

   getAuthentication() {
    return this.token;  
   }

   setAuthentication(token) {
     this.token = token
   }
}
