import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../interfaces/message';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() public message!: Message;

  constructor(private session: SessionService) { }

  ngOnInit(): void {
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
}
