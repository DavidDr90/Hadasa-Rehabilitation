export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

// public static toHomeStory(json){
//     let story = Object.create(HomeStory.prototype);
//     return Object.assign(story, json);
// }


export class User extends Item{
    // { url: string, title?: string, description?: string, category?: string[] }[]
    constructor(
        public email : string = ""
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