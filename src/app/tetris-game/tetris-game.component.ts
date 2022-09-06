import { Component, OnInit } from '@angular/core';
declare function TetrisGame():any;

@Component({
  selector: 'app-tetris-game',
  templateUrl: './tetris-game.component.html',
  styleUrls: ['./tetris-game.component.css']
})
export class TetrisGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    TetrisGame();
  }

}
