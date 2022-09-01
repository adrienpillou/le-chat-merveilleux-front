export class User{
    id!: number;
    pseudo!: string;
    login!: string;
    password!: string;

    constructor(id: number, pseudo: string, login: string, password: string){
        this.id = id;
        this.pseudo = pseudo;
        this.login = login;
        this.password = password;
    }
}