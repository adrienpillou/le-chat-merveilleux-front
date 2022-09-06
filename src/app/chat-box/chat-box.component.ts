import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { API_BASE_URL, CHATTING_ROUTE, LOGIN_ROUTE } from 'src/globals';
import { WidgetsComponent } from '../widgets/widgets.component';
import { RoomsService } from '../services/rooms.service';
import { SessionService } from '../services/session.service';
import { ChatSidenavComponent } from '../chat-sidenav/chat-sidenav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})

export class ChatBoxComponent implements OnInit {
  messages!: Message[];

  constructor(private http: HttpClient,
              public roomsService: RoomsService,
              private session: SessionService,
              private router: Router) { }

  ngOnInit(): void {
    if(!this.session.isUserConnected()){
      this.router.navigate([LOGIN_ROUTE]);
    }
  }

  ngAfterView(){
    console.warn("ngAfterView");
  }

  ngAfterChanges(){
    console.warn("ngAfterChanges");
  }

  ngAfterViewInit() { 
    this.messages = this.roomsService.getMessages();
    console.warn("ngAfterViewInit");
  }

  isRoomEmpty(): boolean{
    return this.roomsService.getMessages().length == 0;
  }

  //Descendre le slider en bas de la boite de chat
  scrollToBottom(){
    let chatBoxDiv: HTMLElement = document.querySelector(".container-chat-box") as HTMLElement;
    chatBoxDiv.scroll(0, chatBoxDiv.scrollHeight);
  }
}
