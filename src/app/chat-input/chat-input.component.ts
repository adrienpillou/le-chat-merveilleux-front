import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Room } from '../models/room';
import { SessionService } from '../services/session.service';
import { API_BASE_URL, CHATTING_ROUTE} from 'src/globals';
import { Message } from '../models/message';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  fieldValue!: string;

  constructor(private http: HttpClient,
              private session: SessionService,
              private router: Router,
              private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.bindEnterKey();
  }

  // merci adrien
  // Envoyer un message à l'API
  sendMessage(){
    let user!: User;
    let messageToSend!: Message;
    let room!: Room;

    if(!this.session.isUserConnected()){
      console.error("Impossible d'envoyer un message : PAS DE SESSION");
      return;
    }

    if (this.fieldValue == undefined){
      return;
    }
      
    // Récupérer l'auteur du message [User]
    user = this.session.getUserFromSession();

    // Préparer la room
    let roomIndex:number = this.session.getCurrentRoom();

    room = new Room(roomIndex, null);

    // Préparer le message
    messageToSend = new Message(user, this.fieldValue, room);

    console.warn(messageToSend);
    this.http.post(
      API_BASE_URL + CHATTING_ROUTE,
      messageToSend
    ).subscribe( (res) => {
      //console.log(res);
      this.fieldValue = "";
      this.roomsService.fetchMessagesByRoomId(roomIndex);
      //location.reload();
    });
  }

  getDate(): string{
    let date = new Date();
    return date.toLocaleTimeString();
  }

  // Associer la touche entrée au bouton HTML envoyer
  bindEnterKey(){
    let sendButton: HTMLButtonElement = document.querySelector("#send-button") as HTMLButtonElement;
    let inputField: HTMLInputElement = document.querySelector("#field") as HTMLInputElement;
    inputField.addEventListener("keypress", (event) => {
      if(event.key === "Enter"){
        sendButton.click();
      }
    });
  }
}