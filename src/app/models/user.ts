export class User{
    id!: number | null;
    pseudo!: string;
    login!: string;
    password!: string;
    avatarUrl!:string;
    score!:number | null;
    telephone!: string | null;

    constructor(id: number | null, pseudo: string, login: string, password: string, telephone: string | null){
        this.id = this.id;
        this.pseudo = pseudo;
        this.login = login;
        this.password = password;
        this.telephone = telephone;
        this.avatarUrl = "";
    }

    pickAvatar(): string{
        let index = Math.floor(Math.random()*100000);
        this.avatarUrl = `https://avatars.dicebear.com/api/bottts/${index}.svg`;
        return this.avatarUrl;
    }
}
