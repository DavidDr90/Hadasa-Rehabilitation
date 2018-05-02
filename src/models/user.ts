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
        public name : string = "", 
        public lastname: string = "",
        public id: string = ""
    )
    {
        super()
    }

    public static copy(obj): User{
        return new User(obj.name, obj.lastname, obj.id)
    }

    public Clone()
    {
        return new User(this.name,this.lastname);
    }

    public toString()
    {
        return this.name +" "+ this.lastname;
    }
}