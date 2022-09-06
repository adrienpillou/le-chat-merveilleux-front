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
  setUserEmail(email: string){
    localStorage.setItem('email', email);
  }
  setUserTelephone(telephone: string){
    localStorage.setItem('telephone', telephone);
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

  getPassword(){
    let password:string | null;
    password = localStorage.getItem('password');
    if(password == null){
      return "";
    }
    return password;
  }

  getUserId(){
    return parseInt(localStorage.getItem('userId') || "");
  }
  getEmail(){
    let email:string | null;
    email = localStorage.getItem('email');
    if(email == null){
      return "";
    }
    return email;
  }
  getTelephone(){
    let telephone:string | null;
    telephone = localStorage.getItem('telephone');
    if(telephone == null){
      return "";
    }
    return telephone;
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
      this.getPassword(),
      this.getEmail(),
      this.getTelephone(),
      //"*****"
    );
    user.avatarUrl = this.getUserAvatarUrl() as string;
    return user;
  }

  createUserSession(user: User){
    this.setLogin(user.login);
    this.setPseudo(user.pseudo);
    this.setPassword(user.password);
    this.setUserId(user.id);
    this.setUserEmail(user.email);
    this.setUserTelephone(user.telephone);
    this.setAvatarUrl(user.avatarUrl);
    console.warn(`Session créée pour ${user.login}`);
  }
}
