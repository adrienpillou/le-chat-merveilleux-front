import { Component, OnInit } from '@angular/core';
import { Session } from '../interfaces/session';
import { SessionService } from '../services/session.service';
import { APP_TITLE } from 'src/globals';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  pseudo: string = "";
  title: string = APP_TITLE;

  constructor(public sessionService: SessionService) { }

  ngOnInit(): void {
    this.pseudo = this.sessionService.getSession().pseudo;
  }

}
