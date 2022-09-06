import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { API_BASE_URL, CHATTING_ROUTE } from 'src/globals';
import { WidgetsComponent } from '../widgets/widgets.component';
import { RoomsService } from '../services/rooms.service';
import { SessionService } from '../services/session.service';
import { ChatSidenavComponent } from '../chat-sidenav/chat-sidenav.component';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})

export class ChatBoxComponent implements OnInit {
  messages!: Message[];

  constructor(private http: HttpClient,
              public roomsService: RoomsService,
              private session: SessionService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.messages = this.roomsService.getMessages();
    }, 1000);
  }

  ngAfterView(){
    console.warn("ngAfterView");
  }

  ngAfterChanges(){
    console.warn("ngAfterChanges");
  }

  ngAfterViewInit() { 
    this.messages = this.roomsService.getMessages();
    this.scrollToBottom();
    console.warn("ngAfterViewInit");
  }

  isRoomEmpty(): boolean{
    return this.roomsService.messages.length == 0;
  }

  //Descendre le slider en bas de la boite de chat
  scrollToBottom(){
    let chatBoxDiv: HTMLElement = document.querySelector(".container-chat-box") as HTMLElement;
    chatBoxDiv.scroll(0, chatBoxDiv.scrollHeight);
  }
}
