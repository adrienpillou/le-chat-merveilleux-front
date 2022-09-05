import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, MESSAGES_BY_ROOM_ROUTE, ROOMS_ROUTE } from 'src/globals';
import { Room } from '../models/room';

@Component({
  selector: 'app-chat-sidenav',
  templateUrl: './chat-sidenav.component.html',
  styleUrls: ['./chat-sidenav.component.css']
})

export class ChatSidenavComponent implements OnInit {
  rooms!: Room[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.hide();
    this.addSideNavEvents();
    this.getRooms();
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
      next: (data) => { this.rooms = data as Room[]; },
      error: (err) => { console.log(err) }
    });
  }

  //Récupérer les messages d'une room en particulier
  fetchMessagesByRoomId(roomID: string) {
    this.http.get(`${API_BASE_URL}${MESSAGES_BY_ROOM_ROUTE}/${roomID}`).subscribe(res => {
      console.log(res);
    });
  }
}
