import { Component, OnInit } from '@angular/core';
import { Init } from 'src/assets/games/tetris';

@Component({
  selector: 'app-tetris-game',
  templateUrl: './tetris-game.component.html',
  styleUrls: ['./tetris-game.component.css']
})
export class TetrisGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    Init();
  }

}
