import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { APP_TITLE } from 'src/globals';
import { Router } from '@angular/router';
import { HOME_ROUTE } from 'src/globals';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  pseudo!: string;
  avatarUrl!: string;
  title: string = APP_TITLE;

  constructor(public session: SessionService, private router: Router) { }

  ngOnInit(): void {
    if(this.isUserConnected()){
      this.pseudo = this.session.getUserFromSession().pseudo;
      this.avatarUrl = this.session.getUserFromSession().avatarUrl;
      console.warn(this.pseudo, this.avatarUrl);
    }else{
      this.pseudo = "";
      this.avatarUrl = "";
    }
  }

  isUserConnected(): boolean{
    return this.session.isUserConnected();
  }

  disconnectUser(){
    this.session.deleteSession();
    this.router.navigate([HOME_ROUTE]);
  }

  getPseudo(): string{
    return this.session.getPseudo();
  }

  getAvatar(){
    return this.session.getUserAvatarUrl();
  }
}
