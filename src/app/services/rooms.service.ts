import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  public messages!: Message[];
  public room!: Room;

  constructor() {
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
}
