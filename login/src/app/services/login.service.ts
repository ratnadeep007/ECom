import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(public http:Http) {
    console.log("Login Service working");
  }

  getUser(logindata){
    return this.http.get('http://localhost:3000/getuser/',logindata)
      .map(res => res.json());
  }

}
