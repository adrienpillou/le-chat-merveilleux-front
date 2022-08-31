import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMessages("http://localhost:7777/chattin")
  }

  getMessages(url:string){
    this.messages = this.http.get(url);
    console.log(this.messages);
  }

}
