import { Room } from "./room";
import { User } from "./user";

export interface Message {
    date: string;
    contenu: string;
    user: User;
    room: Room;
}
