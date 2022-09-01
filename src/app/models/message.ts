import { User } from '../models/user';
import { Room } from './room';

export class Message {
    public date!:string;
    public user!: User;
    public contenu!: string;
    public room!: Room

    constructor(date: string, user: User, contenu: string, room: Room){
        this.date = date;
        this.user = user;
        this.contenu = contenu;
        this.room = room;
    }
}
