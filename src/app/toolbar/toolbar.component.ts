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
  title: string = APP_TITLE;

  constructor(public session: SessionService, private router: Router) { }

  ngOnInit(): void {
    if(this.isUserConnected()){
      this.pseudo = this.session.getUserFromSession().pseudo;
    }else{
      this.pseudo = "";
    }
  }

  isUserConnected(): boolean{
    return this.session.isUserConnected();
  }

  disconnectUser(){
    this.session.deleteSession();
    this.router.navigate([HOME_ROUTE]);
  }
}
