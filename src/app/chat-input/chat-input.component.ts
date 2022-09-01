import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../interfaces/message';
import { Room } from '../models/room';
import { SessionService } from '../services/session.service';
import { API_BASE_URL, CHATTING_ROUTE} from 'src/globals';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  fieldValue!: string;

  constructor(private http: HttpClient, private session: SessionService) { }

  ngOnInit(): void {
  }

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
    messageToSend.contenu = this.fieldValue;
    messageToSend.date = this.getDate();
    messageToSend.user = user;
    //messageToSend.room = room;

    this.http.post(
      API_BASE_URL + CHATTING_ROUTE,
      messageToSend as Object
    ).subscribe( (res) => console.log(res));
  }


  getDate():string{
    let date = new Date();
    return date.toString();
  }
}