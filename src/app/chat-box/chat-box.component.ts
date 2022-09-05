import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { API_BASE_URL, CHATTING_ROUTE } from 'src/globals';
import { WidgetsComponent } from '../widgets/widgets.component';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})

export class ChatBoxComponent implements OnInit {
  messages!: Message[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMessages(API_BASE_URL + CHATTING_ROUTE);
  }

  getMessages(url:string){
    this.http.get(url).subscribe(data => {
      this.messages = data as Message[];
    });
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  //Descendre le slider en bas de la boite de chat
  scrollToBottom(){
    let chatBoxDiv: HTMLElement = document.querySelector(".container-chat-box") as HTMLElement;
    console.log(chatBoxDiv);
    chatBoxDiv.scroll(0, chatBoxDiv.scrollHeight);
  }
}
