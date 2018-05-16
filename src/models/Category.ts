export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

export class Category extends Item{

    constructor(
        public name: string,
        public imageURL: string,
        public email: string,
        public id: string,
        public parentCategoryId: string)
        {
            super()
        }
    

    public get getName(){
            return this.name;
    }

    public get getID(){
        return this.id;
}
    
    public get getImage(){
        return this.imageURL;
    }
    
    public get getEmail(){
        return this.email;
    }

    public get getparentCategoryId(){
        return this.parentCategoryId;
    }

    public setName(t: string){
        this.name = t;
    }

    public setUrl(u: string){
        this.imageURL = u;
    }

    public setID(id: string){
        this.id = id;
    }

    public setEmail(email: string){
        this.email = email;
    }

        
  }

