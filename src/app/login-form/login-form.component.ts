import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';

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
    let res: boolean;
    this.http.post(
      "http://localhost:7777/signin",
      {login: this.login, password: this.password}).subscribe(r => {
        res = r as boolean;
        console.log(res);
        // Supprimer la session courante
        this.session.deleteUserSession();
        this.session.createUserSession(this.login, this.login);
        this.router.navigate(['/home']);
      }
    );
  }
}
