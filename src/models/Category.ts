export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

export class Category extends Item{

    constructor(private name: string, //the hebrew name of the category
                public id: string, //the ID of the category on the DB
                private imageURL: string, //the image url of the category
                private userEmail: string, //the email of the user that have this category
                private parentCategoryID: string, //if not NULL, the ID of the parent category of this sub category
                private views:number, //the number of the times the user clicked the category
                private isFav:boolean// TRUE if this category is one of the user selected favorite categories. else, FALSE.
            )
    {
        super()
    }

    
    //GETTERS
    public get getName(){
        return this.name;
    }
    public get getID(){
        return this.id;
    }
    public get getImage(){
        return this.imageURL;
    }
    public get getUserEmail(){
        return this.userEmail;
    }
    public get getParentCategoryID(){
        return this.parentCategoryID;
    }
    public get getViews(){
        return this.views;
    }
    public get getIsFav(){
        return this.isFav;
    }

    
    public get getparentCategoryId(){
        return this.parentCategoryId;
    }
  
    //SETTERS
    public setName(t: string){
        this.name = t;
    }
    public set setUrl(u: string){
        this.imageURL = u;
    }
    public set setID(id: string){
        this.id = id;
    }
    public set setUserEmail(email: string){
        this.userEmail = email;
    }
    public set setParentCategoryID(categoryParent: string){
       this.parentCategoryID = categoryParent;
    }
    public set setIsFav(isFav:boolean){
        this.isFav=isFav;
    }

    //each time a category has chosen, her views increase by 1.
    public increaseViews(){
        this.views++;
    }

        
  }

