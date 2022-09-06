import { Component, OnInit } from '@angular/core';
import { Init } from 'src/assets/games/snake';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    Init();
  }

}
