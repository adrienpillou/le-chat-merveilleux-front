import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})

export class SigninFormComponent implements OnInit {
  pseudo!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    
  }

  signInUsingForm(){
    console.log(this.pseudo, this.email, this.password, this.confirmPassword);
    if(this.confirmPassword != this.password){
      console.warn("Mismatch mot de passe !");
      return;
    }

    let newUser!: object;
    newUser = {
      "pseudo": this.pseudo,
      "login": this.email,
      "password": this.password
    }

    let res: any;

    this.http.post("http://localhost:7777/signin", newUser).subscribe(r => {
      console.warn(r);
      this.router.navigate(['/login']);
    });
  }

}
