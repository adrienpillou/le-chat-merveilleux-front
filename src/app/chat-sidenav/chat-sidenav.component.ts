import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-sidenav',
  templateUrl: './chat-sidenav.component.html',
  styleUrls: ['./chat-sidenav.component.css']
})

export class ChatSidenavComponent implements OnInit {

  shouldRun = true;

  constructor() { }

  ngOnInit(): void {
    this.hide();
    this.addEvents();
    this.bindButtons();
  }

  hide(){
    let e = document.querySelector(".sidenav");
    e?.classList.remove("visible");
    e?.classList.add("hidden");
  }

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
  fetchRooms(roomName: string){
    console.log(roomName);
    this.hide();
  }

  // Associer un bouton de la sidenave à un événement
  bindButtons(){
    let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".room-link") as NodeListOf<HTMLButtonElement>;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click",
        (event) => this.fetchRooms(buttons[i].innerText)
      );
    }
  }
}
