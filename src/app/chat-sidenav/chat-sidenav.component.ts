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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.hide();
    this.addEvents();
    this.bindButtons();
    this.addRoomsButtons();
  }

  // Cacher la sidenav
  hide(){
    let e = document.querySelector(".sidenav");
    e?.classList.remove("visible");
    e?.classList.add("hidden");
  }

  // Montrer la sidenav
  show(){
    let e = document.querySelector(".sidenav");
    e?.classList.remove("hidden");
    e?.classList.add("visible");
  }

  // Evenements d'interaction avec la sidenav
  addEvents(){
    let sidenavCollider: HTMLDivElement = document.querySelector("#sidenav-collider") as HTMLDivElement;
    let sidenavElement: HTMLDivElement = document.querySelector('.sidenav')as HTMLDivElement;
    sidenavCollider.addEventListener("mouseenter", (e) => {
      this.show();
    });
    sidenavElement.addEventListener("mouseleave", (e) => {
      this.hide();
    });
  }

  // Récupérer les messages d'un salon
  fetchRooms(): any{
    let roomNames:string[] = [];
    fetch (API_BASE_URL + ROOMS_ROUTE)
      .then((res) => res.json())
      .then((data)=> data as Room[])
      .then((data)=>{
        let rooms: Room[] = data;
        for (let r of rooms){
          roomNames.push(r.name);
        }
        return roomNames;
      }); 
  }

  //Récupérer les messages d'une room
  fetchMessagesByRoomId(roomID: string){
    this.http.get(`${API_BASE_URL}${MESSAGES_BY_ROOM_ROUTE}/${roomID}`).subscribe( res => {
      console.log(res);
    });
  }

  // Remplir la sidenav en ajoutant un bouton pour chaque room
  async addRoomsButtons(){
    /*<button mat-button class="room-link">Room 000</button>*/
    let roomNames!: string[];
    roomNames = this.fetchRooms();
    //roomNames = ["Général", "Projet", "Autres"];
    console.warn(roomNames);
    
    let sidenavRoot: HTMLElement;
    sidenavRoot = document.querySelector("#button-container")as HTMLElement;
    
    for(let i=0; i<roomNames.length; i++){
      let buttonToAdd: HTMLButtonElement;
      buttonToAdd = document.createElement("button");
      buttonToAdd.classList.add("room-link");
      buttonToAdd.innerHTML = roomNames[i];
      sidenavRoot.appendChild(buttonToAdd);
      //sidenavRoot.innerHTML += `<button mat-button class="room-link">${roomNames[i]}</button>`
    }
  }

  // Associer un bouton de la sidenave à un événement
  bindButtons(){
    let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".room-link") as NodeListOf<HTMLButtonElement>;
    if(buttons.length == 0)
      return;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click",
        (event) => this.fetchMessagesByRoomId("1")
      );
    }
  }
}
