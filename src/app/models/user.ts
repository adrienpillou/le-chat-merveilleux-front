export class User{
    id!: number;
    pseudo!: string;
    login!: string;
    password!: string;
    email!: string;
    telephone!: string;

    constructor(id: number, pseudo: string, login: string, password: string, email: string, telephone: string){
        this.id = id;
        this.pseudo = pseudo;
        this.login = login;
        this.password = password;
        this.email = email;
        this.telephone = telephone;
    }
}
