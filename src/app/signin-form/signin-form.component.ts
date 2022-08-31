import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  pseudo:string = "";
  id:string = "";
  password:string = "";
  confirmPassword:string = "";

  constructor() { }

  ngOnInit(): void {

  }

  signInUsingForm(){
    console.log(this.pseudo, this.id, this.password, this.confirmPassword);
  }

}
