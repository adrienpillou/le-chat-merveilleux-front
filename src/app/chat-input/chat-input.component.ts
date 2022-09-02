import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Room } from '../models/room';
import { SessionService } from '../services/session.service';
import { API_BASE_URL, CHATTING_ROUTE} from 'src/globals';
import { Message } from '../models/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  fieldValue!: string;

  constructor(private http: HttpClient, private session: SessionService, private router: Router) { }

  ngOnInit(): void {
  }


  // Envoyer un message à l'API
  sendMessage(){
    let user!: User;
    let messageToSend!: Message;
    let room!: Room;

    this.session.getLogin();

    if(!this.session.isUserConnected()){
      console.error("Impossible d'envoyer un message : PAS DE SESSION");
      return;
    }

    // Récupérer l'auteur du message [User]
    user = this.session.getUserFromSession();

    // Préparer la room
    room = new Room("1", "Room1");

    // Préparer le message
    messageToSend = new Message(this.getDate(), user, this.fieldValue, room);
    //messageToSend.room = room;

    console.warn(messageToSend);
    this.http.post(
      API_BASE_URL + CHATTING_ROUTE,
      messageToSend
    ).subscribe( (res) => {
      console.log(res);
      this.fieldValue = "";
    });
  }

  getDate(): string{
    let date = new Date();
    return date.toLocaleTimeString();
  }
}