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
    this.show();
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
}
