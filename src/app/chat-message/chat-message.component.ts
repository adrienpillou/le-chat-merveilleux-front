import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() public message!: Message;
  public time!: string;

  constructor(private session: SessionService) { }

  ngOnInit(): void {
    this.formatTimeStamp();
  }

  // Retourne vrai si le message est envoyé par l'utilisateur de la session
  isSelf(): boolean{
    let clientID: number;
    clientID = this.session.getUserId();
    if (this.message.user.id == clientID){
      return true;
    }
    return false;
  }

  formatTimeStamp(){
    let t: number  = Date.parse(this.message.date);
    let d: Date = new Date(t);
    this.time = d.toLocaleTimeString();
  }
}
