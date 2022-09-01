import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() public info!: Message;

  constructor() { }

  ngOnInit(): void {
    console.log(this.info);
  }

  // A compléter
  isSelf():boolean{
    
    return true;
  }

}
