import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  url: string = "http://localhost:8089/api/users";

  name: string = '';
  email: string = '';

  constructor(private http: HttpClient) {}

  // Save the user details to the database
  signUp() 
  {
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
    };

    this.http.post(this.url + "/signup", bodyData, {responseType: 'text'}).subscribe((resultData: any) => 
    {
      console.log(resultData);
      alert(`Welcome ${this.name}`);
    },
    (error) => {
      console.error("Error Signing up User: ", error)
    });
  }

}
