import { User } from "./user";

export interface Message {
    date: string;
    contenu: string;
    user: User;
}
