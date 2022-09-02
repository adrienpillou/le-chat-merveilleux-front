import { Injectable } from '@angular/core';
import { Session } from '../interfaces/session-interface';
import { User } from '../models/user';
/* Service de gestion de la session */

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  public session!: Session;

  constructor() { }

  setPseudo(pseudo: string){
    localStorage.setItem('pseudo', pseudo);
  }

  setLogin(login: string){
    localStorage.setItem('login', login);
  }

  setUserId(id: number){
    localStorage.setItem('userId', id.toString());
  }

  setAvatarUrl(url: string){
    localStorage.setItem('avatarUrl', url);
  }

  getPseudo(){
    let pseudo:string | null;
    pseudo = localStorage.getItem('pseudo');
    if(pseudo == null){
      return "";
    }
    return pseudo;
  }

  getLogin(){
    let login:string | null;
    login = localStorage.getItem('login');
    if(login == null){
      return "";
    }
    return login;
  }

  getUserId(){
    return parseInt(localStorage.getItem('userId') || "");
  }

  getUserAvatarUrl(){
    return localStorage.getItem('avatarUrl');
  }

  deleteSession(){
    localStorage.clear();
    console.warn(`Session effacée`);
  }

  isUserConnected(): boolean{
    if (this.getLogin() == ""){
      return false;
    }
    return true;
  }

  getUserFromSession(){
    let user: User = new User(
      this.getUserId(),
      this.getPseudo(),
      this.getLogin(),
      "*****"
    );
    return user;
  }

  createUserSession(user: User){
    this.setLogin(user.login);
    this.setPseudo(user.pseudo);
    this.setUserId(user.id);
    this.setAvatarUrl(user.avatarUrl);
    console.warn(`Session créée pour ${user.login}`);
  }
}
