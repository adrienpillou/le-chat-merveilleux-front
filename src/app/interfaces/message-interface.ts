import { Room } from "./room-interface";
import { User } from "./user-interface";

export interface Message {
    date: string;
    contenu: string;
    user: User;
    room: Room;
}
