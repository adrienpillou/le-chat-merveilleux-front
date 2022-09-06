import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Room } from '../models/room';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, MESSAGES_BY_ROOM_ROUTE } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private messages: Message[];
  private room!: Room;

  constructor(private http: HttpClient) {
    this.messages = [];
  }

  setMessages(messages: Message[]){
    this.messages = messages;
  }

  addMessage(message: Message){
    this.messages.push(message);
  }

  getMessages(): Message[]{
    return this.messages;
  }

  setRoom(room: Room){
    this.room = room;
  }

  getRoom(): Room{
    return this.room;
  }

  //Récupérer les messages d'une room en particulier
  fetchMessagesByRoomId(roomID: number| null) {
    if(roomID == null)
      return;
    this.http.get(`${API_BASE_URL}${MESSAGES_BY_ROOM_ROUTE}/${roomID}`).subscribe(res => {
      let messages: Message[] = res as Message[];
      this.setMessages(messages);
    });
  }
}
