import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { API_BASE_URL, CHATTING_ROUTE } from 'src/globals';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages!: Message[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMessages(API_BASE_URL + CHATTING_ROUTE)
  }

  getMessages(url:string){
    this.http.get(url).subscribe(data => {
      this.messages = data as Message[];
      console.log(this.messages);
    });
  }

}
