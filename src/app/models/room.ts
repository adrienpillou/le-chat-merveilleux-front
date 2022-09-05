export class Room{
    id!: string;
    name!: string | null;

    constructor(id: string, name: string | null){
        this.id = id;
        this.name = name;
    }
}