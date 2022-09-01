import { Injectable } from '@angular/core';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public session!: Session;

  constructor() { }

  // Créer une session à un utilisateur en utilisant le localstorage
  createUserSession(login: string, pseudo: string) {
    let currentSession = localStorage.getItem('session');
    if (currentSession != null) {
      console.warn("Une session est déjà en cours d'utilisation.");
      return;
    }

    this.session.login = login;
    this.session.pseudo = pseudo;
    
    localStorage.setItem('session', JSON.stringify(this.session as Object));
    console.warn(`Session créée pour l'utilisateur ${pseudo}.`);
  }

  // Supprimer la session courante
  deleteUserSession() {
    this.session.pseudo = "";
    this.session.login = "";
    localStorage.removeItem('session');
    console.warn('Session effacée.');
  }

  // Récupérer la session en cours d'utilisation
  getSession(): Session {
    this.session = JSON.parse(localStorage.getItem('session') || "") as Session;
    return this.session;
  }
}
