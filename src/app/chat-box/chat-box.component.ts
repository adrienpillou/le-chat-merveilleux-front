import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../interfaces/message-interface';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages!: Message[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMessages("http://localhost:7777/chattin")
  }

  getMessages(url:string){
    this.http.get(url).subscribe(data => {
      this.messages = data as Message[];
    });
  }

}
