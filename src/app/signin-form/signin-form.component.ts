import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL, SIGNIN_ROUTE } from 'src/globals';
import { User } from '../models/user';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})

export class SigninFormComponent implements OnInit {
  pseudo!: string;
  login!: string;
  password!: string;
  confirmPassword!: string;
  telephone!:string;
  email!:string;
  public message!: string;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.message = "";
  }

  signInUsingForm(){
    this.message = "";

    if(this.login == "" || this.login == undefined){
      this.message += "Identifiant manquant";
    }

    if(this.pseudo == "" || this.pseudo == undefined){
      this.message += "\nPseudo manquant";
    }

    if(this.password == "" || this.password == undefined){
      this.message += "\nMot de passe manquant";
    }
    if(this.telephone == "" || this.telephone == undefined){
      this.message += "\nTelephone manquant";
    }


    if(this.confirmPassword != this.password){
      this.message += "\nLes mots de passe ne correspondent pas.";
      console.warn("Mismatch mot de passe !");
      return;
    }

    if(this.message.length > 0){
      return;
    }
      
    let userObject!: Object;
    let user: User = new User(null, this.pseudo, this.login, this.password, this.telephone, this.email);
    user.pickAvatar();

    userObject = {
      pseudo: user.pseudo,
      avatarUrl: user.avatarUrl,
      login: user.login,
      password: user.password,
      telephone: user.telephone,
      email: user.email,
    }

    this.http.post("http://localhost:7777/signin", userObject).subscribe( res => {
      console.warn(res as User);
      this.router.navigate(['/login']);
    });
  }

}
