export class User{
    id!: number;
    pseudo!: string;
    login!: string;
    password!: string;
    avatarUrl!:string;

    constructor(id: number, pseudo: string, login: string, password: string){
        this.id = id;
        this.pseudo = pseudo;
        this.login = login;
        this.password = password;
        this.avatarUrl = "https://avatars.dicebear.com/api/bottts/12.svg"
    }
}