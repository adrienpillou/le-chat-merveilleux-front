import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  id:string = "";
  password:string = "";

  constructor(public router: Router) {

  }

  ngOnInit(): void {
  }

  loginUsingForm(){
    
    // Récupérer les champs du formulaire
    if(this.id == "")
      return;

    if(this.password =="")
      return;

    // Supprimer la session courante
    this.deleteUserSession();
    
    // Authentifier en passant par l'API
    /* A FAIRE */

    this.createUserSession(this.id, this.password);
    this.router.navigate(['/home']);
  }

  // Créer une session à un utilisateur en utilisant le localstorage
  createUserSession(id: string, password: string){

    let currentSession = localStorage.getItem('session');
    if(currentSession != null){
      console.warn("Une session est déjà en cours d'utilisation.");
      return;
    }

    let user: object;
    user = {
      "identifiant": id,
      "password": password
    };

    let session: object;
    session = {
      "user": user
    };

    localStorage.setItem('session', JSON.stringify(session));
    console.warn(`Session créée pour l'utilisateur ${id}.`);
    
  }

  // Supprimer la session courante
  deleteUserSession(){
    localStorage.removeItem('session');
    console.warn('Session effacée.');
  }

  // Récupérer la session en cours d'utilisation
  getSession(): any{
    let session: object;
    if(localStorage.getItem('session') != null){
      session = localStorage.getItem('session') as Object;
    }else{
      return null;
    }
  }

}
