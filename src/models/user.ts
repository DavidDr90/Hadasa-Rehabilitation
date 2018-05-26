
export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

export class User extends Item{

    constructor(
        public email : string = "",
    )
    {
        super()
    }

    public get getEmail()
    {
        return this.email;
    }

    public static copy(obj): User{
        return new User(obj.email)
    }

    public Clone()
    {
        return new User(this.email);
    }

    public toString()
    {
        return this.email;
    }
}