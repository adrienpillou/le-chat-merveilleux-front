import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public user!: User;
  public editedUser!: User;
  public avatarUrl!: string;
  //pseudo!: string;
  //id!: any;

  constructor(private http: HttpClient,public session: SessionService, private router: Router) { }

  ngOnInit() {
    if(this.isUserConnected()){
      this.user = this.session.getUserFromSession();
      this.editedUser = this.user;
      console.log(this.user);
    }else{

    }
/*
    if(this.isUserConnected()){
      this.pseudo = this.session.getUserFromSession().pseudo;

    }else{
      this.pseudo = "";
    }
    if(this.isUserConnected()){
      this.id = this.session.getUserFromSession().id;
    }else{
      this.id = "";
    }*/
  }

  isUserConnected(): boolean{
    return this.session.isUserConnected();
  }

  modifProfil(){
    this.http.put('http://localhost:7777/users/update', this.editedUser).subscribe({
      next: (data) => {
        this.user = data as User;
        this.session.createUserSession(this.user);
      },
      error: (err) => { console.log(err) }
    });
  }

  getPseudo(){
    return this.session.getPseudo();
  }

  getLogin(){
    return this.session.getLogin();
  }

  getPassword(){
    return this.session.getPassword();
  }

  getAvatarUrl(){
    return this.editedUser.avatarUrl;
  }

  changeAvatar(){
    this.editedUser.avatarUrl = this.editedUser.pickAvatar();
  }
}
