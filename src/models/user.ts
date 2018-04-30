export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}


export class User extends Item{
    // { url: string, title?: string, description?: string, category?: string[] }[]
    constructor(
        public name : string = "", 
        public lastname: string = "",

    )
    {
        super()
    }

    public toString()
    {
        return this.name +" "+ this.lastname;
    }
}