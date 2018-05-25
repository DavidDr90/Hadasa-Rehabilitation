export class Item {
    public static toObject(item) {
        return JSON.parse(JSON.stringify(item));
    }
}

export class Phrase extends Item {

    //TODO:
    //for some resone we cann't access the getter & setter function
    //so for now some of the propertis is public!

    public id: string; //the ID of the phrase in the DB
    public name: string; //the hebrew name of the phrase
    private categoryID: string; //the ID of the category of the phrase in the DB
    private views: number; //the number of the times that the user clicked on the phrase
    public imageURL: string; //the url of the image of the phrase
    //the audio file/url of the phrase.
    public audio: string;//????? the type need to be changed!!!!!
    private isFav: boolean// TRUE if this phrase is one of the user selected favorite phrases. else, FALSE.

    constructor(id: string, name: string, imageURL: string,
        categoryID: string, views: number, audio: string, isFav: boolean) {
        
            super();
        this.id = id;
        this.imageURL = imageURL;
        this.name = name;
        this.categoryID = categoryID;
        this.views = views;
        this.audio = audio;
        this.isFav = isFav;
    }

    //GETTERS
    public getID() {
        return this.id;
    }
     getName() {
        return this.name;
    }
    public getImageURL() {
        return this.imageURL;
    }
    public getCategoryID() {
        return this.categoryID;
    }
    public getViews() {
        return this.views;
    }
    public getAudio() {
        return this.audio;
    }
    public getIsFav() {
        return this.isFav;
    }

    //SETTERS
    public setID(id: string) {
        this.id = id;
    }
    public setName(newName: string) {
        this.name = newName;
    }
    public setImageURL(newURL: string) {
        this.imageURL = newURL;
    }
    public setCategoryID(categoryID: string) {
        this.categoryID = categoryID;
    }
    public setAudio(audio: string) {
        this.audio = audio;
    }
    public setIsFav(isFav: boolean) {
        this.isFav = isFav;
    }

    //each time a phrase has been chosen, its views increase by 1.
    public icreaseViews() {
        this.views++;
    }

}
