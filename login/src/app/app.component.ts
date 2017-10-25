import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Login';
  title_text = 'This is a front end for auth app.';

  tab: string;
  isReplyFromTab: boolean;

  tabValue: string;
  loginText: string;

  constructor(){
    //this.tab = 'login'
    this.isReplyFromTab = false;
    console.log(this.isReplyFromTab);
    this.tabValue = 'Register';
    this.loginText = "Not a member?";
    console.log(this.tabValue);
    
  }

  toggle(){
    console.log("button clicked");
    this.isReplyFromTab = !this.isReplyFromTab;
    console.log(this.isReplyFromTab);
    if(this.tabValue === 'Login'){
      this.tabValue = 'Register';
      this.loginText = "Not a member?";
    }else if(this.tabValue === 'Register'){
      this.tabValue = 'Login';
      this.loginText = "Already a member?";
    }
  }

}
