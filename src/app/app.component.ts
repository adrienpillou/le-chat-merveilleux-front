import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_ROUTE } from 'src/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router){
    //router.navigate([HOME_ROUTE]);
  }
}
