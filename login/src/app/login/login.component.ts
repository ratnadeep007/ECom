import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[];
  rForm: FormGroup;
  logindata: any;
  userName: string;
  passWord: string;
  firstName: string;
  lastName: string;
  hash: any;
  test: boolean = false;

  constructor(private loginservice: LoginService,
    private fb: FormBuilder) {
      this.rForm = fb.group({
        'username': [null, Validators.required],
        'password': [null, Validators.required],
        'validate': ''
      });
   }

  ngOnInit() {
    console.log("Login working");
    
  }

  login(logindata){
    this.userName = logindata.username;
    this.passWord = logindata.password;
    this.hash = CryptoJS.SHA1(this.passWord).toString();
    console.log(this.hash);
    //console.log(this.hash.toString());
    console.log(this.userName);
    console.log("Submit");
    this.test = true;
    
    let data = {
      'username': this.userName,
      'password': this.hash
    }

    this.loginservice.getUser(data).subscribe((users)=>{
      this.users = users;
      console.log(this.users[0].username);
      console.log('API:', this.users[0].password);
      console.log('APP', this.hash);
      if(this.hash == this.users[0].password){
        //console.log('login');
        this.firstName = this.users[0].firstname;
        this.lastName = this.users[0].lastname;
      }else{
        console.log('Unable to login');
      }
    });
  }

}

interface User {
  firstname: string,
  lastname: string,
  username: string,
  password: string
}
