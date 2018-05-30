
export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

export class User extends Item{

    email: string;
    password: string;
    constructor()
    {
        super()
    }

    public get getEmail()
    {
        return this.email;
    }


    SetEmail(new_email)
    {
        this.email = new_email
    }

    
    SetPassword(new_password)
    {
        this.password = new_password
    }

    public toString()
    {
        return this.email;
    }
}