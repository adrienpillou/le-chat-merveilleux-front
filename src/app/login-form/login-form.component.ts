import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { User } from '../models/user';
import { API_BASE_URL, LOGIN_ROUTE, HOME_ROUTE} from 'src/globals';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  login: string = "";
  password: string = "";

  constructor(public router: Router, private http: HttpClient, private session: SessionService) {
  }

  ngOnInit(): void {}

  loginUsingForm(){
    
    // Récupérer les champs du formulaire
    if(this.login == "")
      return;

    if(this.password == "")
      return;

    // Authentifier en passant par l'API
    let data: Object;
    this.http.post(
      API_BASE_URL + LOGIN_ROUTE,
      {
        login: this.login,
        password: this.password
      }
      ).subscribe(r => {
        console.log(r as User);// Données retournés par l'API 
        
        // Supprimer la session courante
        this.session.deleteSession();
        this.session.createUserSession(r as User);
        this.router.navigate([HOME_ROUTE]);
      }
    );
  }
}
