import { Injectable } from '@angular/core';
import { Users } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class SessionuserService extends Users {
  
  constructor() { 
    super()
  }

  userConnecte!: Users;
}
