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

  setUserId(id: number | null){
    if(id == null){
      localStorage.setItem('userId', "");
    }else{
      localStorage.setItem('userId', id.toString());
    } 
  }

  setAvatarUrl(url: string){
    localStorage.setItem('avatarUrl', url);
  }

  setCurrentRoom(roomName: string){
    localStorage.setItem("currentRoom", roomName);
  }

  getCurrentRoom(): string{
    return localStorage.getItem("currentRoom") as string;
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
    if (this.getLogin() == "" || this.getUserId() == null || this.getPseudo() == ""){
      return false;
    }
    return true;
  }

  getUserFromSession(){
    let user: User = new User(
      this.getUserId(),
      this.getPseudo(),
      this.getLogin(),
      ""
    );
    user.id = this.getUserId();
    user.avatarUrl = this.getUserAvatarUrl() as string;
    return user;
  }

  createUserSession(user: User){
    this.setLogin(user.login);
    this.setPseudo(user.pseudo);
    this.setUserId(user.id);
    this.setAvatarUrl(user.avatarUrl);
    localStorage.setItem("user", JSON.stringify(user));
    console.warn(`Session créée pour ${user.login}`);
  }
}
