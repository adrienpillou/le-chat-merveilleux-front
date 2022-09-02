import { User } from '../models/user';
import { Room } from './room';

export class Message {
    public date!:Date;
    public user!: User;
    public contenu!: string;
    public room!: Room

    constructor(user: User, contenu: string, room: Room){
        this.user = user;
        this.contenu = contenu;
        this.room = room;
    }
}
