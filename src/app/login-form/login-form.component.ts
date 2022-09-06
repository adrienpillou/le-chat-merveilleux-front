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
  public message!: string;

  constructor(public router: Router, private http: HttpClient, private session: SessionService) {
  }

  ngOnInit(): void {}

  writeMessage(message: string){
    this.message = message;
  }

  loginUsingForm(){
    
    // Récupérer les champs du formulaire
    if(this.login == "")
      return;

    if(this.password == "")
      return;

    // Authentifier en passant par l'API
    this.http.post(
      API_BASE_URL + LOGIN_ROUTE,
      {
        login: this.login,
        password: this.password
      }
      ).subscribe(r => {
        console.log(r as User);// Données retournées par l'API 

        // Mot de passe incorrect ou identifiant inconnu
        if(r == null){
          this.writeMessage("Mot de passe ou identifiant incorrect.");
          return;
        }

        // Supprimer la session courante
        this.session.deleteSession();
        this.session.createUserSession(r as User);
        this.router.navigate([HOME_ROUTE]);
      }
    );
  }
}
