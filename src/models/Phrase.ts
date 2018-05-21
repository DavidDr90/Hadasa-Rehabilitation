export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

    public id: string; //the ID of the phrase in the DB
    private name: string; //the hebrew name of the phrase
    private categoryID: string; //the ID of the category of the phrase in the DB
    private views: number; //the number of the times that the user clicked on the phrase
    private imageURL: string; //the url of the image of the phrase
    //the audio file/url of the phrase.
    private audio: string;//????? the type need to be changed!!!!!
    private isFav:boolean// TRUE if this phrase is one of the user selected favorite phrases. else, FALSE.

    constructor(id:string, name:string, imageURL:string, categoryID:string, views:number, audio:string, isFav:boolean) {
        this.id=id;
        this.imageURL = imageURL;
        this.name = name;
        this.categoryID=categoryID;
        this.views=views;
        this.audio=audio;
        this.isFav=isFav;
    }

    //GETTERS
    public get getID() {
       return this.id;
    }
    public get getName() {
        return this.name;
    }
    public get getImageURL() {

    public GetName():string {
        return this.name;
    }
    public GetImageURL() :string {
        return this.imageURL;
    }
    public get getCategoryID(){
        return this.categoryID;
    }
    public get getViews(){
        return this.views;
    }
    public get gGetAudio(){
        return this.audio;
    }
    public get getIsFav(){
        return this.isFav;
    }

    //SETTERS
    public set setID(id:string) {
        this.id = id;
    }
    public set setName(newName:string) {
        this.name = newName;
    }
    public set setImageURL(newURL:string) {
        this.imageURL = newURL;
    }
    public set setCategoryID(categoryID:string){
        this.categoryID=categoryID;
    }
    public set setAudio(audio:string){
        this.audio=audio;
    }
    public set setIsFav(isFav:boolean){
        this.isFav=isFav;
    }

     //each time a phrase has been chosen, its views increase by 1.
    public icreaseViews(){
        this.views++;
    }

}
