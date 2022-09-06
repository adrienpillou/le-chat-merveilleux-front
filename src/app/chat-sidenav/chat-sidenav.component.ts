import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, MESSAGES_BY_ROOM_ROUTE, ROOMS_ROUTE } from 'src/globals';
import { Room } from '../models/room';
import { Message } from '../models/message';
import { SessionService } from '../services/session.service';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-chat-sidenav',
  templateUrl: './chat-sidenav.component.html',
  styleUrls: ['./chat-sidenav.component.css']
})

export class ChatSidenavComponent implements OnInit {
  rooms!: Room[];

  constructor(private http: HttpClient,
              private session: SessionService,
              private roomsService: RoomsService
  ){}

  ngOnInit(): void {
    this.show();
    this.addSideNavEvents();
    this.getRooms();

    if(this.session.getCurrentRoom() == null){
      this.session.setCurrentRoom(1);
    }
    
    this.fetchMessagesByRoomId(this.session.getCurrentRoom());
  }

  // Cacher la sidenav
  hide() {
    let e = document.querySelector(".sidenav");
    e?.classList.remove("visible");
    e?.classList.add("hidden");
  }

  // Montrer la sidenav
  show() {
    let e = document.querySelector(".sidenav");
    e?.classList.remove("hidden");
    e?.classList.add("visible");
  }

  // Evenements d'interaction avec la sidenav
  addSideNavEvents() {
    let sidenavCollider: HTMLDivElement = document.querySelector("#sidenav-collider") as HTMLDivElement;
    let sidenavElement: HTMLDivElement = document.querySelector('.sidenav') as HTMLDivElement;
    sidenavCollider.addEventListener("mouseenter", (e) => {
      this.show();
    });
    sidenavElement.addEventListener("mouseleave", (e) => {
      this.hide();
    });
  }

  // Récupérer une liste de rooms
  getRooms() {
    this.http.get(`${API_BASE_URL + ROOMS_ROUTE}`).subscribe({
      next: (data) => { this.rooms = data as Room[];},
      error: (err) => { console.log(err) }
    });
  }

  //Récupérer les messages d'une room en particulier
  fetchMessagesByRoomId(roomID: number| null) {
    if(roomID == null)
      return;
    this.http.get(`${API_BASE_URL}${MESSAGES_BY_ROOM_ROUTE}/${roomID}`).subscribe(res => {
      let messages: Message[] = res as Message[];
      this.roomsService.setMessages(messages);
    });
    this.session.setCurrentRoom(roomID);
  }

  isCurrentRoom(roomId: number | null): boolean{
    let currentRoomId = this.session.getCurrentRoom();
    if (currentRoomId === roomId){
      return true;
    }
    return false;
  }
}
